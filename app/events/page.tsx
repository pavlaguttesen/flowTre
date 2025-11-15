"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type Session = {
    id: string;
    starts_at: string;
    ends_at: string;
    title: string;
    description?: string;
    location?: string;
    owner: string;
};

export default function Events() {
  const [sessions, setSessions] = useState<Session[]>([]);

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

    setSessions(data);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
  
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

