"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import CreateEventForm from "./createevent/page";

type Session = {
  id: string;
  starts_at: string;
  ends_at?: string;
  title: string;
  description?: string;
  location?: string;
  owner: string;
};

export default function Events() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionUser, setSessionUser] = useState<any>(null);

  // 🔹 Tjek om bruger er logget ind
  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getSession();
      setSessionUser(data.session?.user ?? null);
    }
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSessionUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 Hent events fra Supabase
  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("starts_at", { ascending: true });

    if (error) {
      console.error("Error fetching sessions:", error);
      return;
    }

    setSessions(data as Session[]);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

      {sessionUser ? (
        <div className="mb-8 border p-4 rounded-lg bg-slate-800">
          <h2 className="text-lg font-semibold mb-3">Create new session</h2>
          <CreateEventForm />
        </div>
      ) : (
        <p className="text-gray-400 mb-6">
          You must be logged in to create new events.
        </p>
      )}

      {sessions.length === 0 && <p>No events found...</p>}

      <ul className="space-y-4">
        {sessions.map((s) => (
          <li key={s.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p>{new Date(s.starts_at).toLocaleString()}</p>
            <p className="text-gray-600">{s.description}</p>
            <p className="text-sm text-gray-500">{s.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
