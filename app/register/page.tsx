
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsError(false);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        setMessage("Account created successfully!");
      } else {
        setMessage(
          "Account created! Please check your email to confirm your account before logging in."
        );
      }
    } catch (error) {
      setIsError(true);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="global-container flex min-h-[75vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-6 sm:p-10">
        <h1 className="font-heading text-4xl font-bold">
          CREATE ACCOUNT
        </h1>

        <p className="mt-3 text-sm text-black/60">
          Join SHOP.CO and find your style.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              minLength={2}
              required
              className="w-full rounded-full bg-[#F0F0F0] px-5 py-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-full bg-[#F0F0F0] px-5 py-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="flex items-center rounded-full bg-[#F0F0F0] pr-5 focus-within:ring-2 focus-within:ring-black">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-full bg-transparent px-5 py-4 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-black/50">
              Use at least 8 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-black px-5 py-4 font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {message && (
            <p
              role="status"
              className={`text-center text-sm ${
                isError ? "text-red-600" : "text-green-700"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-black/60">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-semibold text-black underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
