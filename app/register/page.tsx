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
      // optional metadata – doesn't control permissions, just extra info
      options: {
        data: {
          role: "student", // you can ignore/remove this if you like
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(`Registration failed: ${error.message}`);
      return;
    }

    console.log("New user:", data.user);

    // You can show a message or just redirect straight away
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-red-400 bg-red-900/40 border border-red-700 rounded-md px-3 py-2">
              {message}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-slate-300 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
