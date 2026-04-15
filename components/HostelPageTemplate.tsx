"use client";

import Image from "next/image";
import { useState } from "react";

interface Staff {
    name: string;
    role: string;
    image: string;
    phone: string;
    email: string;
}

interface Props {
    name: string;
    description: string;
    images: string[];
    superintendent: Staff;
    assistant: Staff;
    warden: Staff;
    OfficeIncharge: Staff;

}

export default function HostelPageTemplate({
    name,
    description,
    images,
    superintendent,
    assistant,
    warden,
    OfficeIncharge,
}: Props) {
    const [current, setCurrent] = useState(0);
    const [tab, setTab] = useState("facilities");

    const tabs = ["facilities", "alumni", "events", "notices"];

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* 🔹 HERO CAROUSEL */}
            <section className="relative w-full h-64 md:h-[400px] overflow-hidden">
                <Image
                    src={images[current]}
                    alt={name}
                    fill
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-end">
                    <h1 className="text-white text-2xl md:text-4xl font-bold p-6">
                        {name}
                    </h1>
                </div>

                {/* Controls */}
                <button
                    onClick={() =>
                        setCurrent((prev) => (prev - 1 + images.length) % images.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
                >
                    ‹
                </button>

                <button
                    onClick={() =>
                        setCurrent((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
                >
                    ›
                </button>
            </section>

            <div className="p-4 md:p-10 space-y-12">

                {/* 🔹 ABOUT */}
                <section className="bg-white rounded-2xl shadow p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        About Hostel
                    </h2>

                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                        {description.split("\n").map((para, i) => (
                            <p key={i}>{para.trim()}</p>
                        ))}
                    </div>
                </section>

                {/* 🔹 ADMINISTRATION */}
                <section className="bg-white rounded-2xl shadow p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Administration
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        

                       {/* warden Card */}
                        <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl">
                            <Image
                                src={warden.image}
                                alt={warden.name}
                                width={120}
                                height={120}
                                className="rounded-full object-cover aspect-square shadow"
                            />

                            <div className="mt-4 space-y-1">
                                <p className="text-xs text-blue-600 font-medium uppercase">
                                    Warden
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {warden.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {warden.role}
                                </p>

                                <div className="mt-3 text-sm text-gray-700">
                                    <p><b>Phone:</b> {warden.phone}</p>
                                    <p><b>Email:</b> {warden.email}</p>
                                </div>
                            </div>
                        </div>
                       {/* Superintendent Card */}
                        <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl">
                            <Image
                                src={superintendent.image}
                                alt={superintendent.name}
                                width={120}
                                height={120}
                                className="rounded-full object-cover aspect-square shadow"
                            />

                            <div className="mt-4 space-y-1">
                                <p className="text-xs text-blue-600 font-medium uppercase">
                                    Superintendent
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {superintendent.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {superintendent.role}
                                </p>

                                <div className="mt-3 text-sm text-gray-700">
                                    <p><b>Phone:</b> {superintendent.phone}</p>
                                    <p><b>Email:</b> {superintendent.email}</p>
                                </div>
                            </div>
                        </div>
                        {/* Assistant Card */}
                        <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl">
                            <Image
                                src={assistant.image}
                                alt={assistant.name}
                                width={120}
                                height={120}
                                className="rounded-full object-cover aspect-square shadow"
                            />

                            <div className="mt-4 space-y-1">
                                <p className="text-xs text-blue-600 font-medium uppercase">
                                    Assistant Superintendent
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {assistant.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {assistant.role}
                                </p>

                                <div className="mt-3 text-sm text-gray-700">
                                    <p><b>Phone:</b> {assistant.phone}</p>
                                    <p><b>Email:</b> {assistant.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl">
                            <Image
                                src={OfficeIncharge.image}
                                alt={OfficeIncharge.name}
                                width={120}
                                height={120}
                                className="rounded-full object-cover aspect-square shadow"
                            />

                            <div className="mt-4 space-y-1">
                                <p className="text-xs text-blue-600 font-medium uppercase">
                                    Office Incharge
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {OfficeIncharge.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {OfficeIncharge.role}
                                </p>

                                <div className="mt-3 text-sm text-gray-700">
                                    <p><b>Phone:</b> {assistant.phone}</p>
                                    <p><b>Email:</b> {assistant.email}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 🔹 TABS SECTION */}
                <section className="bg-white rounded-2xl shadow p-6 md:p-8">
                    <div className="flex gap-4 border-b mb-4 overflow-x-auto">
                        {tabs.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`capitalize pb-2 whitespace-nowrap ${tab === t
                                    ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                                    : "text-gray-600"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="text-gray-700 text-sm md:text-base">
                        {tab === "facilities" && (
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Wi-Fi Enabled Campus</li>
                                <li>Mess Facility</li>
                                <li>24/7 Security</li>
                                <li>Study Rooms</li>
                            </ul>
                        )}

                        {tab === "alumni" && (
                            <p>Alumni details will be displayed here.</p>
                        )}

                        {tab === "events" && (
                            <p>Hostel events and activities will be shown here.</p>
                        )}

                        {tab === "notices" && (
                            <p>Important hostel notices will appear here.</p>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}