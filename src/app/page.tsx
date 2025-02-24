"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/Authcontext";

export default function DashboardPage() {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.user) {
      router.push("/login"); // Redirect if not logged in
    } else {
      setLoading(false);
    }
  }, [auth.user, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>; // Prevents null errors
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {auth.user}!</h1>
        <button
          onClick={() => {
            auth.logout();
            router.push("/login");
          }}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
