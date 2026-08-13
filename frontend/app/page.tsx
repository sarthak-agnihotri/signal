"use client";

import { useState } from "react";

const API_URL = "http://127.0.0.1:8001";

export default function Home() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");

  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================================
  // LOGIN
  // ================================

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Login failed"
        );
      }

      // Save JWT
      localStorage.setItem(
        "access_token",
        data.access_token
      );

      setSuccess("Login successful!");

      // Temporary redirect
      window.location.href = "/chat";

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };


  // ================================
  // REGISTER
  // ================================

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (
      !username.trim() ||
      !password.trim() ||
      !displayName.trim()
    ) {
      setError(
        "Username, password and display name are required."
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username.trim(),
            password,
            display_name: displayName.trim(),
            phone: phone.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Registration failed"
        );
      }

      setSuccess(
        "Registration successful. Enter OTP 123456."
      );

      setOtpMode(true);

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };


  // ================================
  // VERIFY OTP
  // ================================

  const handleVerifyOTP = async () => {

    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/verify-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username.trim(),
            otp: otp.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "OTP verification failed"
        );
      }

      // Save JWT
      localStorage.setItem(
        "access_token",
        data.access_token
      );

      setSuccess(
        "Account verified successfully!"
      );

      window.location.href = "/chat";

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };


  // ================================
  // OTP SCREEN
  // ================================

  if (otpMode) {

    return (
      <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4">

        <div className="w-full max-w-md">

          <div className="text-center mb-8">

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#3a76f0]">

              <span className="text-3xl">
                🔐
              </span>

            </div>

            <h1 className="text-3xl font-semibold text-gray-900">
              Verify your account
            </h1>

            <p className="mt-2 text-gray-500">
              Enter the verification code
            </p>

          </div>


          <div className="rounded-2xl bg-white p-7 shadow-sm border border-gray-100">

            <p className="text-sm text-gray-500 mb-5">
              We sent a verification code for:
            </p>

            <p className="font-medium text-gray-900 mb-6">
              @{username}
            </p>


            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-lg tracking-[0.4em] text-gray-900 outline-none focus:border-[#3a76f0] focus:bg-white"
            />


            {error && (
              <p className="mt-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {success && (
              <p className="mt-4 text-sm text-green-600">
                {success}
              </p>
            )}


            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-[#3a76f0] py-3 font-medium text-white hover:bg-[#3168d8] disabled:opacity-50"
            >
              {loading
                ? "Verifying..."
                : "Verify & Continue"}
            </button>


            <p className="mt-5 text-center text-xs text-gray-400">
              Demo OTP: 123456
            </p>

          </div>

        </div>

      </main>
    );
  }


  // ================================
  // LOGIN / REGISTER
  // ================================

  return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#3a76f0]">

            <span className="text-3xl">
              💬
            </span>

          </div>

          <h1 className="text-3xl font-semibold text-gray-900">
            Signal
          </h1>

          <p className="mt-2 text-gray-500">
            Simple. Private. Connected.
          </p>

        </div>


        {/* Card */}

        <div className="rounded-2xl bg-white p-7 shadow-sm border border-gray-100">

          <div className="flex rounded-xl bg-gray-100 p-1 mb-7">

            <button
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 rounded-lg py-2 text-sm font-medium ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>


            <button
              onClick={() => {
                setMode("register");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 rounded-lg py-2 text-sm font-medium ${
                mode === "register"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Register
            </button>

          </div>


          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "login"
              ? "Welcome back"
              : "Create your account"}
          </h2>


          <p className="mt-2 text-sm text-gray-500">
            {mode === "login"
              ? "Sign in to continue to Signal."
              : "Create an account to start messaging."}
          </p>


          {/* Display Name */}

          {mode === "register" && (

            <div className="mt-6">

              <label className="text-sm font-medium text-gray-700">
                Display name
              </label>

              <input
                type="text"
                value={displayName}
                onChange={(e) =>
                  setDisplayName(e.target.value)
                }
                placeholder="Sarthak Agnihotri"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-[#3a76f0] focus:bg-white"
              />

            </div>

          )}


          {/* Username */}

          <div className="mt-6">

            <label className="text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="sarthak"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-[#3a76f0] focus:bg-white"
            />

          </div>


          {/* Phone */}

          {mode === "register" && (

            <div className="mt-5">

              <label className="text-sm font-medium text-gray-700">
                Phone number
                <span className="text-gray-400">
                  {" "}optional
                </span>
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="+91 9876543210"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-[#3a76f0] focus:bg-white"
              />

            </div>

          )}


          {/* Password */}

          <div className="mt-5">

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-[#3a76f0] focus:bg-white"
            />

          </div>


          {/* Error */}

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}


          {/* Success */}

          {success && (
            <p className="mt-4 text-sm text-green-600">
              {success}
            </p>
          )}


          {/* Button */}

          <button
            onClick={
              mode === "login"
                ? handleLogin
                : handleRegister
            }
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#3a76f0] py-3 font-medium text-white transition hover:bg-[#3168d8] disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create account"}
          </button>


          {/* Privacy */}

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-gray-50 p-4">

            <div className="mt-0.5">
              🔐
            </div>

            <div>

              <p className="text-sm font-medium text-gray-800">
                Privacy first
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Your conversations are protected by
                Signal's privacy-focused architecture.
              </p>

            </div>

          </div>

        </div>


        <p className="mt-6 text-center text-xs text-gray-400">
          Built with Next.js, FastAPI & WebSockets
        </p>

      </div>

    </main>
  );
}