"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* 🔹 SIDEBAR */}
      <aside className="w-64 bg-[#8B1D2C] text-white hidden md:flex flex-col p-5">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4 text-sm">
          <button
            onClick={() => router.push("/admin-dashboard")}
            className="block w-full text-left hover:bg-[#6F1622] px-3 py-2 rounded"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/admin-dashboard/students")}
            className="block w-full text-left hover:bg-[#6F1622] px-3 py-2 rounded"
          >
            Students
          </button>

          <button
            onClick={() => router.push("/admin-dashboard/hostels")}
            className="block w-full text-left hover:bg-[#6F1622] px-3 py-2 rounded"
          >
            Hostels
          </button>

          <button
            onClick={() => router.push("/admin-dashboard/complaints")}
            className="block w-full text-left hover:bg-[#6F1622] px-3 py-2 rounded"
          >
            Complaints
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={() => router.push("/admin-login")}
          className="mt-auto bg-white text-[#8B1D2C] px-3 py-2 rounded font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* 🔹 MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>

          <div className="text-sm text-gray-600">
            Welcome, Admin
          </div>
        </div>

        {/* 🔹 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Students */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-600 text-sm">Total Students</h3>
            <p className="text-2xl font-bold text-[#8B1D2C] mt-2">120</p>
          </div>

          {/* Hostels */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-600 text-sm">Total Hostels</h3>
            <p className="text-2xl font-bold text-[#8B1D2C] mt-2">8</p>
          </div>

          {/* Complaints */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-600 text-sm">Pending Complaints</h3>
            <p className="text-2xl font-bold text-[#8B1D2C] mt-2">15</p>
          </div>
        </div>

        {/* 🔹 TABLE (Recent Students) */}
        <div className="mt-8 bg-white rounded shadow p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Students
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Hostel</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="p-2">Ankit</td>
                  <td className="p-2">ankit@gmail.com</td>
                  <td className="p-2">Boys Hostel A</td>
                  <td className="p-2 text-green-600 font-medium">Approved</td>
                </tr>

                <tr className="border-t">
                  <td className="p-2">Rahul</td>
                  <td className="p-2">rahul@gmail.com</td>
                  <td className="p-2">Boys Hostel B</td>
                  <td className="p-2 text-yellow-600 font-medium">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}