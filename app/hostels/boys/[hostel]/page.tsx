import { notFound } from "next/navigation";

import SirGNJha from "@/components/hostels/SirGNJha";
// import PCB from "@/components/hostels/PCB";

interface PageProps {
  params: Promise<{
    hostel: string;
  }>;
}

export default async function HostelDashboard({ params }: PageProps) {
  // ✅ REQUIRED in your setup
  const { hostel } = await params;

  const hostelComponents = {
    "sir-gn-jha-hostel": SirGNJha,
    // pcb: PCB,
  };

  const Component =
    hostelComponents[hostel as keyof typeof hostelComponents];

  if (!Component) return notFound();

  return <Component />;
}