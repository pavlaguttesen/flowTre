import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HomePage() {
  return (
    <div
      className={montserrat.className}
      style={{
        display: "flex",
        height: "80vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>
        Welcome to Session Planner
      </h1>

      <p style={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: "400" }}>
        Manage and view your teaching sessions easily.
      </p>
    </div>
  );
}
