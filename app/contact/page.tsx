"use client";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  const handleClick = () => {
    const isFormValid = true;

    if (isFormValid) {
      router.push("/");
    }
  };

  return (
    <div>
      
        <input type="text" id="name" />

        <button onClick={handleClick}>
          Test Navigation
        </button>
      
      <h1>Contact Page</h1>
    </div>
  );
}
