import { notFound } from "next/navigation";

// import SNaidu from "@/components/hostels/SNaidu";
import KChawala from "@/components/hostels/KChawla";
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
    // "sarojini-naidu-girls-hostel": SNaidu,
    "Kalpana-Chawala-Hostel": KChawala,
    // pcb: PCB,
  };

  const Component =
    hostelComponents[hostel as keyof typeof hostelComponents];

  if (!Component) return notFound();

  return <Component />;
}