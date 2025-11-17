"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(`Login failed: ${error.message}`);
      return;
    }

    console.log("Access token:", data.session?.access_token);

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--background) text-(--foreground) p-6">
      <div className="w-full max-w-md bg-(--card-bg) border border-(--card-border) p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-(--forest-50) mb-6 text-center">
          Log In
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
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
              autoComplete="current-password"
              className="
                w-full rounded-md 
                bg-(--forest-950) 
                border border-(--forest-700) 
                px-3 py-2 text-sm
                text-(--forest-50) 
                placeholder:text-(--forest-300)/70
                focus:outline-none focus:ring-2 focus:ring-(--jade-400)
              "
              placeholder="••••••••"
            />
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-red-300 bg-red-900/40 border border-red-700 rounded-md px-3 py-2">
              {message}
            </p>
          )}

          {/* Login Button */}
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-(--forest-100) mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-(--jade-300) hover:text-(--jade-200) underline underline-offset-2"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
