//events

"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";

type Session = {
    id: string;
    starts_at: string;
    ends_at: string;
    title: string;
    description?: string;
    location?: string;
    owner: string;
};

export default function EventsPage() {
    return (
        <>
            <h1>Events</h1>
        </>
    );
}