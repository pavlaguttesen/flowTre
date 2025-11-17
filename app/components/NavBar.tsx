"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-xl font-bold">
          Moodle 2.01
        </Link>

        <div className="flex items-center gap-4 text-slate-200">
          {/* Always visible */}
          <Link href="/events" className="hover:text-white">
            Sessions
          </Link>

          {session ? (
            <>
              <span className="text-sm">{session.user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md text-sm"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
              <Link href="/register" className="hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
