import crypto from "crypto";
import { PrismaClient } from "./generated/prisma";
import { sendMail } from "./mailer";

const prisma = new PrismaClient();

const OTP_LENGTH = 4;
const OTP_EXPIRY_MINUTES = 10;

function hashCode(email: string, code: string) {
  return crypto.createHash("sha256").update(`${email}:${code}`).digest("hex");
}

function generateCode() {
  const num = crypto.randomInt(10 ** (OTP_LENGTH - 1), 10 ** OTP_LENGTH);
  return num.toString();
}

export async function requestOtp(email: string) {
  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  const now = new Date();

  // One active code per email
  await prisma.verification.deleteMany({
    where: { identifier: email },
  });

  await prisma.verification.create({
    data: {
      id: crypto.randomUUID(),
      identifier: email,
      value: hashCode(email, code),
      expiresAt,
      createdAt: now,
      updatedAt: now,
    },
  });

  const mailResult = await sendMail({
    to: email,
    subject: "Your verification code",
    text: `Your one-time verification code is ${code}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
  });

  // In dev, surface the code if email wasn't sent (helps unblock testing).
  const devCode =
    !mailResult.sent && process.env.NODE_ENV !== "production" ? code : undefined;

  if (!mailResult.sent) {
    console.warn("[otp] Email delivery skipped/failed", {
      reason: mailResult.error ?? "unknown",
    });
  }

  return { expiresAt, devCode };
}

export async function verifyOtp(email: string, code: string) {
  const record = await prisma.verification.findFirst({
    where: {
      identifier: email,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    throw new Error("No active code found or it has expired.");
  }

  const hashed = hashCode(email, code);
  if (record.value !== hashed) {
    throw new Error("Invalid code.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    await prisma.user.update({
      where: { email },
      data: { emailVerified: true, updatedAt: new Date() },
    });
  }

  // Clean up codes for this email
  await prisma.verification.deleteMany({
    where: { identifier: email },
  });

  return { verified: true };
}

