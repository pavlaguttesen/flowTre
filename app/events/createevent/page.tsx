"use client";

import "@mantine/dates/styles.css";
import { Button, Text } from "@mantine/core";

import { DateTimePicker } from "@mantine/dates";

import { useState } from "react";

export default function CreateEventForm() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [created, setCreated] = useState<Date>(new Date());
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!date || !name || !endDate || !owner)
      return alert("Please fill in all fields");

    const res = await fetch("/api/sessions", {
      method: "POST",
      body: JSON.stringify({
        starts_at: date.toISOString(),
        ends_at: endDate.toISOString(),
        title: name.trim(),
        description: description.trim() || null,
        location: location.trim() || null,
        owner: owner.trim(),
        created_at: created.toISOString(),
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await res.json());
  }

  return (
    <form onSubmit={handleSubmit}>
      <Text size="xl" fw={700} mb="md">
        Create your event here....
      </Text>

      {/* Start Time */}
      <DateTimePicker
        style={{ width: "180px" }}
        label="Start date"
        value={date ? date.toISOString() : null} // or your preferred format
        onChange={(value) => {
          setDate(value ? new Date(value) : null);
        }}
      />

      {/* End Time */}
      <DateTimePicker
        style={{ width: "180px" }}
        label="End Date"
        value={endDate ? endDate.toISOString() : null} // or your preferred format
        onChange={(value) => {
          setEndDate(value ? new Date(value) : null);
        }}
      />
      {/* Name */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Owner */}
      <div>
        <label htmlFor="owner">Owner</label>
        <input
          type="text"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>

      <Button className="mt-4" type="submit" variant="filled">
        Click me
      </Button>
    </form>
  );
}
