import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const { url } = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: "/dashboard",
      },
    });

    if (url) {
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL("/auth", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  } catch (error) {
    console.error("Google sign-in error:", error);
    return NextResponse.redirect(new URL("/auth", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  }
}

