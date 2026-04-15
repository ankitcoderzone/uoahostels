import HostelPageTemplate from "@/components/HostelPageTemplate";

export default function SirGNJhaPage() {
  return (
    <HostelPageTemplate
      name="Sir G.N. Jha Hostel"
      description="A premier boys hostel at University of Allahabad..."
      images={[
        "/images/boyshostels/gnjha.jpeg",
        "/images/boyshostels/gnjha.jpeg",
        "/images/boyshostels/gnjha.jpeg",
      
      ]}
      warden={{
        name: "Dr. A.K. Sharma",
        role: "Professor, Department of Physics",
        image: "/images/sirgnjha/superintendent.jpg",
        phone: "+91 9876543210",
        email: "aksharma@univ.edu",
      }}
      superintendent={{
        name: "Dr. A.K. Sharma",
        role: "Professor, Department of Physics",
        image: "/images/sirgnjha/superintendent.jpg",
        phone: "+91 9876543210",
        email: "aksharma@univ.edu",
      }}
      assistant={{
        name: "Mr. R.K. Singh",
        role: "Assistant Warden",
        image: "/images/sirgnjha/assistant.jpg",
        phone: "+91 9123456780",
        email: "rksingh@univ.edu",
      }}
      OfficeIncharge={{
        name: "Mr. R.K. Singh",
        role: "Assistant Warden",
        image: "/images/sirgnjha/assistant.jpg",
        phone: "+91 9123456780",
        email: "rksingh@univ.edu",
      }}
    />
  );
}