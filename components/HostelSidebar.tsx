"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HostelConfig } from "@/data/hostels";

interface SidebarProps {
  slug: string;
  config: HostelConfig;
}

export default function HostelSidebar({ slug, config }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 shrink-0 text-white flex flex-col"
      style={{ backgroundColor: config.color }}
    >
      {/* Header */}
      <div className="p-5 font-bold text-lg border-b border-white/20">
        {config.name}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-3">
        <Link
          href={`/hostels/${slug}`}
          className={`block hover:underline ${
            pathname === `/hostels/${slug}` ? "font-semibold underline" : ""
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
              className={`block capitalize hover:underline ${
                pathname === path ? "font-semibold underline" : ""
              }`}
            >
              {module}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}