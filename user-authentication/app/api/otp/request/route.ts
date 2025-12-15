import { NextRequest, NextResponse } from "next/server";
import { requestOtp } from "@/lib/otp";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 },
      );
    }

    const result = await requestOtp(email.toLowerCase().trim());

    return NextResponse.json({
      message: "OTP sent successfully.",
      expiresAt: result.expiresAt,
      devCode: result.devCode, // only populated in dev when email send is skipped
    });
  } catch (error: any) {
    console.error("OTP request error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to send OTP. Please try again shortly." },
      { status: 500 },
    );
  }
}

