// app/layout.tsx
import Link from "next/link";
import { Button } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

import { MantineProvider } from "@mantine/core";

export const metadata = {
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
      <body>
        <MantineProvider>
          <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
            <nav style={{ display: "flex", gap: "1rem" }}>
              <Link href="/">Home</Link>

              <Link href="/events">Sessions</Link>
            </nav>
          </header>

          <main style={{ padding: "1rem" }}>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
