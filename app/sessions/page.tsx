// Todos.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Session } from "../types/session";


export default function Todos() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    // 1) supabase-js automatically sends the JWT (if logged in)
    const { data, error }: { data: Session[] | null; error: any } = await supabase
      .from("sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading sessions", error);
      return;
    }

    setSessions(data ?? []);
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // 2) Again, supabase-js adds the Authorization: Bearer <JWT> header automatically
    const { data, error } = await supabase
      .from("sessions")
      .insert({ title: newTitle.trim() })
      .select("*")
      .single();

    if (error) {
      console.error("Error inserting session", error);
      return;
    }

    setSessions((prev) => [data!, ...prev]);
    setNewTitle("");
  }

  return (
    <div>
      <h2>Your todos</h2>

      <form onSubmit={addTodo}>
        <input
          placeholder="New session"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            {s.title} {s.description} {s.description ? "✅" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}