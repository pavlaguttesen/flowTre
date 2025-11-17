import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Session Planner",
  description: "Plan your sessions with ease!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Full-screen forest background wrapper */}
        <div className="min-h-screen w-full bg-(--background) text-(--foreground)">
          <NavBar />

          <main className="max-w-6xl mx-auto py-6 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
