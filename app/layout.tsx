import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Moodle 2.01",
  description: "Learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <NavBar />

        <main className="max-w-5xl mx-auto py-6 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
