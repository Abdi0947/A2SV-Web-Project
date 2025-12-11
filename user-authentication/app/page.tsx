"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      if (userData.isAuthenticated) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the User Authentication App
        </h1>
        <p className="text-gray-600 mb-8">
          Please sign in to your account or create a new one to get started.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/SignIn"
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/SignUp"
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
