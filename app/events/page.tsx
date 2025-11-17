"use client";

import { useState, useEffect, type FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider, Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

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

  // Form state
  const [date, setDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [owner, setOwner] = useState<string>("");

  // Check if user is logged in
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

  // Fetch sessions
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

  // Handle create event
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!date || !endDate || !name || !owner) {
      alert("Please fill in all fields");
      return;
    }

    const startDate = new Date(date);
    const endDateObj = new Date(endDate);

    if (endDateObj <= startDate) {
      alert("End time must be later than the start time.");
      return;
    }

    const { data, error } = await supabase
      .from("sessions")
      .insert({
        starts_at: startDate.toISOString(),
        ends_at: endDateObj.toISOString(),
        title: name.trim(),
        description: description.trim() || null,
        location: location.trim() || null,
        owner: owner.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error", error);
      return;
    }

    setDate(null);
    setEndDate(null);
    setName("");
    setDescription("");
    setLocation("");
    setOwner("");

    fetchSessions();
    alert("Event created successfully!");
  }

  const startDateObject = date ? new Date(date) : undefined;

  return (
    <MantineProvider>
      <div className="min-h-screen bg-(--background) text-(--foreground)">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-(--forest-50)">
                Sessions & Events
              </h1>
              <p className="mt-1 text-sm text-(--forest-100)/80">
                Plan, create, and browse upcoming sessions.
              </p>
            </div>
          </header>

          {/* Create Session */}
          {sessionUser ? (
            <section className="mb-10">
              <div className="rounded-2xl border border-(--card-border) bg-(--card-bg) shadow-xl p-6">
                <h2 className="text-xl font-semibold text-(--forest-50) mb-1">
                  Create a new session
                </h2>
                <p className="text-sm text-(--forest-100)/80 mb-4">
                  Set the details for your new session below.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="grid gap-4 md:grid-cols-2"
                >
                  {/* Start Time */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-(--jade-200) mb-1">
                      Start Date
                    </label>
                    <DateTimePicker
                      className="
                        w-full 
                        [&_.mantine-DateTimePicker-input]:bg-(--forest-950) 
                        [&_.mantine-DateTimePicker-input]:border-(--forest-700) 
                        [&_.mantine-DateTimePicker-input]:text-(--forest-50)
                      "
                      value={date}
                      onChange={setDate}
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-(--jade-200) mb-1">
                      End Date
                    </label>
                    <DateTimePicker
                      className="
                        w-full 
                        [&_.mantine-DateTimePicker-input]:bg-(--forest-950) 
                        [&_.mantine-DateTimePicker-input]:border-(--forest-700) 
                        [&_.mantine-DateTimePicker-input]:text-(--forest-50)
                      "
                      value={endDate}
                      onChange={setEndDate}
                      minDate={startDateObject}
                    />
                  </div>

                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-(--jade-200) mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="
                        w-full rounded-lg 
                        border border-(--forest-700) 
                        bg-(--forest-950) 
                        px-3 py-2 text-sm 
                        text-(--forest-50) 
                        placeholder:text-(--forest-300)/60
                      "
                      placeholder="Session title"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-(--jade-200) mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="
                        w-full rounded-lg 
                        border border-(--forest-700) 
                        bg-(--forest-950) 
                        px-3 py-2 text-sm 
                        text-(--forest-50) 
                        placeholder:text-(--forest-300)/60
                      "
                      placeholder="Brief description"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-(--jade-200) mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="
                        w-full rounded-lg 
                        border border-(--forest-700) 
                        bg-(--forest-950) 
                        px-3 py-2 text-sm 
                        text-(--forest-50) 
                        placeholder:text-(--forest-300)/60
                      "
                      placeholder="Room, Online, etc."
                    />
                  </div>

                  {/* Owner */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-(--jade-200) mb-1">
                      Owner
                    </label>
                    <input
                      type="text"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      className="
                        w-full rounded-lg 
                        border border-(--forest-700) 
                        bg-(--forest-950) 
                        px-3 py-2 text-sm 
                        text-(--forest-50) 
                        placeholder:text-(--forest-300)/60
                      "
                      placeholder="Your name"
                    />
                  </div>

                  {/* Create */}
                  <div className="md:col-span-2 flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="filled"
                      className="
                        bg-(--button-bg) 
                        hover:bg-(--button-bg-hover) 
                        text-(--button-text) 
                        font-semibold px-6 py-2 
                        rounded-lg transition-all shadow-md
                      "
                    >
                      Create Session
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          ) : (
            <p className="text-(--forest-100)/80 mb-8 text-sm">
              You must be logged in to create new events.
            </p>
          )}

          {/* Sessions list */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-(--forest-50)">
                Upcoming Sessions
              </h2>
              <span className="text-xs uppercase tracking-wide text-(--jade-300)/80">
                {sessions.length} {sessions.length === 1 ? "session" : "sessions"}
              </span>
            </div>

            {sessions.length === 0 ? (
              <p className="text-(--forest-100)/80 text-sm">
                No events found yet.
              </p>
            ) : (
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sessions.map((s) => (
                  <li
                    key={s.id}
                    className="
                      group rounded-2xl 
                      border border-(--card-border) 
                      bg-(--card-bg) p-4 
                      shadow-md 
                      transition-transform 
                      hover:-translate-y-1 hover:shadow-lg
                    "
                  >
                    <h3 className="text-lg font-semibold text-(--forest-50) mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs text-(--jade-200) mb-2">
                      {new Date(s.starts_at).toLocaleString()}
                      {s.ends_at && (
                        <> – {new Date(s.ends_at).toLocaleTimeString()}</>
                      )}
                    </p>

                    {s.description && (
                      <p className="text-sm text-(--forest-100) line-clamp-3 mb-2">
                        {s.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-(--jade-200) mt-2">
                      {s.location && (
                        <span className="truncate max-w-[60%]">
                          📍 {s.location}
                        </span>
                      )}
                      <span className="ml-auto text-(--forest-100)/80">
                        👤 {s.owner}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </MantineProvider>
  );
}
