import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

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

    const response = await auth.api.signInEmail({
      body: {
        email: email.toLowerCase().trim(),
        password,
        callbackURL: "/dashboard",
      },
    });

    return NextResponse.json(
      { message: "Signed in successfully." },
      { status: 200, headers: response.headers },
    );
  } catch (error: any) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to sign in." },
      { status: 400 },
    );
  }
}

