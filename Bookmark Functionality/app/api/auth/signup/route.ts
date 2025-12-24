import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { requestOtp } from "@/lib/otp";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 },
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 },
      );
    }

    const response = await auth.api.signUpEmail({
      body: {
        email: email.toLowerCase().trim(),
        password,
        name,
        callbackURL: "/dashboard",
      },
    });

    // Send OTP after account creation
    await requestOtp(email.toLowerCase().trim());

    return NextResponse.json(
      { message: "Account created. OTP sent to email." },
      { status: 200, headers: response.headers },
    );
  } catch (error: any) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to create account." },
      { status: 400 },
    );
  }
}

