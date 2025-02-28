"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signup`, {
        username: username,
        password: password,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("You have successfully Signup please wait...!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      setMessage("Fail to Signup please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 mx-auto border border-gray-40 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-light">Register</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          className="p-2 border w-full mb-2 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded-lg w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 bg-blue-500 text-white rounded w-full" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
        <p className="text-center text-light mt-4">
          Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}
