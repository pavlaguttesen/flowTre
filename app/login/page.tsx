"use client";
// LoginForm.tsx
import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Login failed: ${error.message}`);
      return;
    }

    // data.session contains the JWT access token
    const accessToken = data.session?.access_token;
    console.log("Access token (JWT) from Supabase:", accessToken);

    setMessage("Logged in!");
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
      </div>

      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
      </div>

      <button type="submit">Log in</button>
      {message && <p>{message}</p>}
    </form>
  );
}