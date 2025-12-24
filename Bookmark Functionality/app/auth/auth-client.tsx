"use client";

import { useEffect, useRef, useState } from "react";

type Step = "signup" | "verify";
type Mode = "signup" | "login";

export default function AuthClientPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("signup");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const signUp = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      setStatus(null);
      setStep("verify");
      setResendTimer(30);
      setCodeDigits(["", "", "", ""]);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to sign in.");
      }
      setStatus("Signed in. Redirecting to dashboard...");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async () => {
    setLoading(true);
    setError(null);
  setStatus(null);

    try {
      const res = await fetch("/api/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send code.");
      }

      const devHint = data.devCode
        ? ` (dev code: ${data.devCode})`
        : "";
      setStatus(devHint ? `Code sent. Use this code in dev: ${devHint}` : null);
      setStep("verify");
      setResendTimer(30);
      setCodeDigits(["", "", "", ""]);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: codeDigits.join(""),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to verify code.");
      }

      setStatus("Email verified successfully! Redirecting to dashboard...");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = () => {
    window.location.href = "/api/auth/social/google";
  };

  const canSignUp =
    name.trim().length > 1 &&
    email.includes("@") &&
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    !loading;
  const canLogin = email.includes("@") && password.length >= 6 && !loading;
  const canRequest = email.includes("@") && !loading;
  const canVerify =
    codeDigits.join("").length === 4 && email.includes("@") && !loading;

  useEffect(() => {
    if (step !== "verify") return;
    if (resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [step, resendTimer]);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...codeDigits];
    next[index] = value;
    setCodeDigits(next);

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {(mode === "signup" && step === "signup") || mode === "login" ? (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="flex-1 h-px bg-gray-200 max-w-[80px]" />
              <h1 className="text-3xl font-bold text-gray-900 font-[var(--font-poppins)]">
                {mode === "login" ? "Welcome Back," : "Sign Up Today"}
              </h1>
              <span className="flex-1 h-px bg-gray-200 max-w-[80px]" />
            </div>
          </div>
        ) : null}

        {mode === "signup" && step === "verify" && (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2 font-[var(--font-poppins)]">
              Verify Email
            </h1>
            <p className="text-sm text-center text-gray-600 mb-6">
              Enter the 4-digit code we sent to your email.
            </p>
          </>
        )}

        <div className="space-y-4">
          {mode === "signup" && step === "signup" && (
            <>
              <button
                type="button"
                onClick={signUpWithGoogle}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent"
                />
              </div>
            </>
          )}

          {mode === "signup" && step === "verify" && (
            <>
              <div className="flex justify-center space-x-3 mb-2">
                {codeDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                You can request to{" "}
                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={requestOtp}
                  className="text-[#4640DE] font-medium disabled:opacity-50"
                >
                  Resend code
                </button>{" "}
                in{" "}
                <span className="font-semibold text-[#4640DE]">
                  0:{String(resendTimer).padStart(2, "0")}
                </span>
              </p>
            </>
          )}

          {mode === "login" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent"
                />
              </div>
            </>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {status && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
              {status}
            </p>
          )}

          {mode === "signup" && step === "signup" && (
            <button
              type="button"
              disabled={!canSignUp}
              onClick={signUp}
              className="w-full bg-[#2e2a8c] text-white py-3 rounded-full font-semibold hover:bg-[#262272] transition mt-2 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          )}

          {mode === "signup" && step === "verify" && (
            <button
              type="button"
              disabled={!canVerify}
              onClick={verifyOtp}
              className="w-full bg-[#2e2a8c] text-white py-3 rounded-full font-semibold hover:bg-[#262272] transition mt-6 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          )}

          {mode === "login" && (
            <button
              type="button"
              disabled={!canLogin}
              onClick={signIn}
              className="w-full bg-[#2e2a8c] text-white py-3 rounded-full font-semibold hover:bg-[#262272] transition mt-6 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Log in"}
            </button>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          {mode === "signup" ? (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setStep("signup");
                setError(null);
                setStatus(null);
                setResendTimer(0);
              }}
              className="text-[#2e2a8c] font-semibold hover:text-[#262272]"
            >
              Already have an account? Login
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setStep("signup");
                setError(null);
                setStatus(null);
              }}
              className="text-[#2e2a8c] font-semibold hover:text-[#262272]"
            >
              Don’t have an account? Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}