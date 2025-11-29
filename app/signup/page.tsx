// SignUpPage.tsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth?action=signup", { email, username, password });
      router.push("/login");
    } catch (err) {
      setError("Sign Up failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="p-6 rounded-2xl shadow-xl bg-white w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-xl"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-xl"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-xl"
          required
        />

        <button
          type="submit"
          className="w-full p-3 bg-black text-white rounded-xl hover:opacity-80 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

