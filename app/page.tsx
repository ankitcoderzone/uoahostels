"use client";
import React from "react";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { HOSTELS, Gender } from "@/data/hostels";

export default function HomePage(): JSX.Element {
  const router = useRouter();

  const [gender, setGender] = useState<Gender | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const filteredHostels = gender
    ? Object.entries(HOSTELS).filter(
        ([_, hostel]) => hostel.gender === gender
      )
    : [];

  const handleEnter = () => {
    if (!selectedSlug || !gender) return;
    router.push(`/hostels/${gender}/${selectedSlug}`);
  };

  const handleGenderSelect = (value: Gender) => {
    setGender(value);
    setSelectedSlug(null);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F6F4F2]">

      {/* 🔹 TOP HEADER */}
      <div className="sticky top-0 z-50 w-full flex items-center justify-end px-4 md:px-8 py-3 bg-white shadow-sm">
        {/* <div className="text-sm md:text-base font-semibold text-gray-700">
          UoA Hostel System
        </div> */}

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => router.push("/student-register")}
            className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg
              bg-[#8B1D2C] text-white hover:bg-[#6F1622] transition"
          >
            Hostel Registration
          </button>

          <button
            onClick={() => router.push("/login")}
            className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg
              border border-[#8B1D2C] text-[#8B1D2C] hover:bg-[#F6EDEE] transition"
          >
            Admin Login
          </button>
          <button
            onClick={() => router.push("/student-login")}
            className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-lg
              border border-[#8B1D2C] text-[#8B1D2C] hover:bg-[#F6EDEE] transition"
          >
            Student Login
          </button>
        </div>
      </div>

      {/* 🔹 MAIN CONTENT (FIXED HEIGHT ISSUE HERE) */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* LEFT SECTION */}
        <section className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12 md:px-10 bg-white text-center">
          <img
            src="/images.jpeg"
            alt="University of Allahabad"
            className="w-24 h-24 md:w-36 md:h-36 mb-5 md:mb-6"
          />

          <h1 className="text-3xl md:text-4xl font-bold text-[#8B1D2C]">
            UoA Hostel Management System
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-600 max-w-sm md:max-w-md leading-relaxed">
            <span className="font-semibold text-gray-900">
              University of Allahabad
            </span>{" "}
            Hostel Management System
          </p>

          <div className="mt-6 h-1 w-20 md:w-24 bg-[#C9A24D] rounded-full" />
        </section>

        {/* RIGHT SECTION */}
        <section className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 md:px-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">

            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              Select Hostel
            </h2>

            {/* GENDER SELECTOR */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {(["boys", "girls"] as Gender[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleGenderSelect(type)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base
                    ${
                      gender === type
                        ? "bg-[#8B1D2C] text-white shadow-md"
                        : "bg-[#F6F4F2] text-gray-800 hover:bg-[#EDE9E5]"
                    }`}
                >
                  {type === "boys" ? "Boys Hostel" : "Girls Hostel"}
                </button>
              ))}
            </div>

            {/* HOSTEL LIST */}
            {gender && (
              <>
                <h3 className="text-sm md:text-base font-medium mb-4 text-gray-700">
                  Select Your Hostel
                </h3>

                <ul className="space-y-3">
                  {filteredHostels.map(([slug, hostel]) => (
                    <li key={slug}>
                      <button
                        onClick={() => setSelectedSlug(slug)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm md:text-base
                          ${
                            selectedSlug === slug
                              ? "bg-[#8B1D2C] text-white shadow-md"
                              : "bg-[#F6F4F2] text-gray-800 hover:bg-[#EDE9E5]"
                          }`}
                      >
                        {hostel.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* ENTER BUTTON */}
            <button
              disabled={!selectedSlug || !gender}
              onClick={handleEnter}
              className={`mt-8 w-full flex items-center justify-between px-2 text-base md:text-lg font-semibold transition
                ${
                  selectedSlug && gender
                    ? "text-[#8B1D2C] hover:text-[#6F1622]"
                    : "opacity-40 cursor-not-allowed text-gray-500"
                }`}
            >
              Enter
              <span className="text-xl md:text-2xl">→</span>
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}