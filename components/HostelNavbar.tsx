"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HostelConfig } from "@/data/hostels";

interface NavbarProps {
  slug: string;
  config: HostelConfig;
}

export default function HostelNavbar({ slug, config }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="w-full text-white shadow-md"
      style={{ backgroundColor: config.color }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          {config.logo && (
            <Image
              src={config.logo}
              alt={config.name}
              width={70}
              height={70}
              className="rounded-full aspect-square object-cover"
            />
          )}
          <span className="font-bold text-lg">{config.name}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/hostels/${slug}`}
            className={`hover:underline ${
              pathname === `/hostels/${slug}`
                ? "underline font-semibold"
                : ""
            }`}
          >
            Dashboard
          </Link>

          {config.modules.map((module) => {
            const path = `/hostels/${slug}/${module}`;
            return (
              <Link
                key={module}
                href={path}
                className={`capitalize hover:underline ${
                  pathname === path ? "underline font-semibold" : ""
                }`}
              >
                {module}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            href={`/hostels/${slug}`}
            onClick={() => setOpen(false)}
            className={`block ${
              pathname === `/hostels/${slug}`
                ? "underline font-semibold"
                : ""
            }`}
          >
            Dashboard
          </Link>

          {config.modules.map((module) => {
            const path = `/hostels/${slug}/${module}`;
            return (
              <Link
                key={module}
                href={path}
                onClick={() => setOpen(false)}
                className={`block capitalize ${
                  pathname === path ? "underline font-semibold" : ""
                }`}
              >
                {module}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}