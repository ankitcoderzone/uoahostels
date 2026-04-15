import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { HOSTELS } from "@/data/hostels";
import HostelNavbar from "@/components/HostelNavbar";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    hostel: string;
  }>;
}

export default async function HostelLayout({
  children,
  params,
}: LayoutProps) {
  const { hostel } = await params;

  const hostelConfig = HOSTELS[hostel];

  if (!hostelConfig) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Shared Navbar */}
      <HostelNavbar slug={hostel} config={hostelConfig} />

      {/* Page Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}