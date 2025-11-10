// app/courses/page.tsx

import Link from "next/link";

const courses = [
  { slug: "nextjs-routing", title: "Next.js Routing" },
  { slug: "react-basics", title: "React Basics" },
  { slug: "fullstack-supabase", title: "Fullstack with Supabase" },
  { slug: "fullstack-supabase2", title: "Fullstack with Supabase" },
];

export default function CoursesPage() {
  return (
    <>
      <h1>Courses</h1>

      <ul>
        {courses.map((c) => (
          <li key={c.slug}>
            <Link href={`/courses/${c.slug}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
