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
    <nav
      className="
        w-full px-6 py-4 
        bg-(--forest-900) 
        border-b border-(--forest-700)
        text-(--forest-50)
      "
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <Link
          href="/"
          className="
            text-xl font-bold 
            text-(--jade-200) 
            hover:text-(--jade-100) 
            transition
          "
        >
          Moodle 2.01
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4 text-(--forest-100)">

          {/* Always visible */}
          <Link
            href="/events"
            className="hover:text-(--jade-200) transition"
          >
            Sessions
          </Link>

          {/* If logged in */}
          {session ? (
            <>
              <span className="text-sm text-(--jade-300)">
                {session.user.email}
              </span>

              <button
                onClick={handleLogout}
                className="
                  px-3 py-1 text-sm rounded-md font-medium
                  bg-(--button-bg)
                  hover:bg-(--button-bg-hover)
                  text-(--button-text)
                  transition
                "
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-(--jade-200) transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="hover:text-(--jade-200) transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
