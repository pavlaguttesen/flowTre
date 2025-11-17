"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(`Registration failed: ${error.message}`);
      return;
    }

    // If email confirmations are enabled, there may be no session yet
    if (!data.session) {
      setMessage("Registration successful! Please check your email to confirm.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--background) text-(--foreground) p-6">
      <div className="w-full max-w-md bg-(--card-bg) border border-(--card-border) p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-(--forest-50) mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm text-(--jade-200) mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="
                w-full rounded-md 
                bg-(--forest-950) 
                border border-(--forest-700) 
                px-3 py-2 text-sm
                text-(--forest-50) 
                placeholder:text-(--forest-300)/70
                focus:outline-none focus:ring-2 focus:ring-(--jade-400)
              "
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-(--jade-200) mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="
                w-full rounded-md 
                bg-(--forest-950) 
                border border-(--forest-700) 
                px-3 py-2 text-sm
                text-(--forest-50) 
                placeholder:text-(--forest-300)/70
                focus:outline-none focus:ring-2 focus:ring-(--jade-400)
              "
              placeholder="Create a strong password"
            />
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-(--jade-100) bg-(--forest-800) border border-(--jade-600) rounded-md px-3 py-2">
              {message}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-md 
              bg-(--button-bg) 
              hover:bg-(--button-bg-hover) 
              text-(--button-text) 
              font-medium py-2 
              transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-(--forest-100) mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-(--jade-300) hover:text-(--jade-200) underline underline-offset-2"
          >
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
}
