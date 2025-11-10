// app/layout.tsx
import Link from "next/link";
import { Button } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";

export const metadata = {
  title: "Next Routing Workshop",
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

              <Link href="/about">About</Link>

              <Link href="/contact">Contact</Link>

              <Link href="/courses">Courses</Link>
              <Link href="/events/createevent">Create Events</Link>
            </nav>
          </header>

          <main style={{ padding: "1rem" }}>{children}</main>
          <Button className="m-4" variant="primary">Default</Button>
          
        </MantineProvider>
      </body>
    </html>
  );
}
