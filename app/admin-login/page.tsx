"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "dsw" | "warden" | "superintendent";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("warden");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/hms/accounts/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
      } else {
        // ✅ role validation (important)
        if (data.user.role !== role) {
          setError("Selected role does not match your account");
          return;
        }

        // store token
        localStorage.setItem("access", data.tokens.access);
        localStorage.setItem("role", data.user.role);

        // 🔀 role-based redirect
        if (role === "dsw") {
          router.push("/admin-dashboard");
        } else if (role === "warden") {
          router.push("/superintendent-dashboard");
        } else if (role === "superintendent") {
          router.push("/superintendent-dashboard");
        }
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

      {/* 🔹 LEFT SECTION */}
      <section className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12 md:px-12 bg-white text-center">
        
        <img
          src="/images.jpeg"
          alt="University of Allahabad"
          className="w-24 h-24 md:w-36 md:h-36 mb-6"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-[#8B1D2C] leading-tight">
          UoA Hostel Management System
        </h1>

        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-sm md:max-w-md leading-relaxed">
          <span className="font-semibold text-gray-900">
            Admin Portal
          </span>{" "}
          University of Allahabad Hostel Management System
        </p>

        <div className="mt-6 h-1 w-24 bg-[#C9A24D] rounded-full" />
      </section>

      {/* 🔹 RIGHT SECTION */}
      <section className="w-full md:w-1/2 flex items-center justify-center px-4 py-10">
        
        <div className="w-full max-w-lg bg-white border border-gray-300 rounded shadow p-6 md:p-8">

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Admin Login
          </h2>

          {/* Instructions */}
          <div className="text-sm text-gray-700 mb-6 space-y-1">
            <p>• Select your role and login.</p>
            <p>• Only authorized staff can access dashboard.</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Role Selection */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="md:w-1/3 font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="md:w-2/3 border text-gray-900 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B1D2C]"
              >
                <option value="dsw">DSW (Admin)</option>
                <option value="warden">Warden</option>
                <option value="superintendent">Superintendent</option>
              </select>
            </div>

            {/* Username */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="md:w-1/3 font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="md:w-2/3 border text-gray-900 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B1D2C]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="md:w-1/3 font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="md:w-2/3 border text-gray-900 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B1D2C]"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm md:ml-[33%]">{error}</p>
            )}

            {/* Button */}
            <div className="flex items-center gap-4 md:ml-[33%]">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#8B1D2C] text-white px-6 py-2 rounded font-semibold hover:bg-[#6F1622] disabled:opacity-50"
              >
                {loading ? "Logging in..." : "LOG IN"}
              </button>
            </div>

          </form>
        </div>

      </section>
    </div>
  );
}