import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, code, password } = await req.json();

    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 },
      );
    }

    if (typeof code !== "string" || code.trim().length !== 4) {
      return NextResponse.json(
        { error: "A 4-digit code is required." },
        { status: 400 },
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password is required to complete sign-in." },
        { status: 400 },
      );
    }

    await verifyOtp(email.toLowerCase().trim(), code.trim());

    // Create session after successful verification.
    const signInResponse = await auth.api.signInEmail({
      body: {
        email: email.toLowerCase().trim(),
        password,
        callbackURL: "/dashboard",
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully." },
      {
        status: 200,
        headers: signInResponse.headers,
      },
    );
  } catch (error: any) {
    console.error("OTP verify error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to verify code." },
      { status: 400 },
    );
  }
}

