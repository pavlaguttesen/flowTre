// app/api/events/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // or anon if insert is public
);

export async function POST(req: Request) {
  const body = await req.json();

  console.log("body", body);

  // SUPABASE PART:
  // In Supabase, column type should be `timestamptz` (timestamp with time zone)
  // so that Postgres stores it as UTC.

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      starts_at: body.starts_at, // 2025-11-02T11:00:00.000Z
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ event: data });
}
