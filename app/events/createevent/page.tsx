"use client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider, Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateEventForm() {
  const [date, setDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [owner, setOwner] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!date || !endDate || !name || !owner) {
      alert("Please fill in all fields");
      return;
    }

    const { data, error } = await supabase
      .from("sessions")
      .insert({
        starts_at: new Date(date).toISOString(),
        ends_at: new Date(endDate).toISOString(),
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

    console.log("Inserted row:", data);

    setDate(null);
    setEndDate(null);
    setName("");
    setDescription("");
    setLocation("");
    setOwner("");
    alert("Event created successfully!");
  }

  return (
    <MantineProvider>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white dark:bg-neutral-700 shadow-lg rounded-xl p-6 space-y-4 border border-gray-100 dark:border-neutral-800"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Create your event here...
        </h2>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <DateTimePicker
            className="w-full"
            value={date}
            onChange={setDate}
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <DateTimePicker
            className="w-full"
            value={endDate}
            onChange={setEndDate}
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter event name"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add a short description"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Where is it happening?"
          />
        </div>

        {/* Owner */}
        <div>
          <label
            htmlFor="owner"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Owner
          </label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Who’s responsible?"
          />
        </div>

        <Button
          type="submit"
          variant="filled"
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all"
        >
          Create Event
        </Button>
      </form>
    </MantineProvider>
  );
}
