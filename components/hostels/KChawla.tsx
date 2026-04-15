import HostelPageTemplate from "@/components/HostelPageTemplate";

export default function SirGNJhaPage() {
  return (
    <HostelPageTemplate
      name="Kalpna Chawla Hostel"
      description="A premier boys hostel at University of Allahabad..."
      images={[
        "/images/girlshostel/kc1.webp",
        "/images/girlshostel/kc2.jpeg",
       
      
      ]}
      warden={{
        name: "Dr. A.K. Sharma",
        role: "Professor, Department of Physics",
        image: "/images/girlshostel/kc1.webp",
        phone: "+91 9876543210",
        email: "aksharma@univ.edu",
      }}
      superintendent={{
        name: "Dr. A.K. Sharma",
        role: "Professor, Department of Physics",
        image: "/images/girlshostel/kc1.webp",
        phone: "+91 9876543210",
        email: "aksharma@univ.edu",
      }}
      assistant={{
        name: "Mr. R.K. Singh",
        role: "Assistant Warden",
        image: "/images/girlshostel/kc1.webp",
        phone: "+91 9123456780",
        email: "rksingh@univ.edu",
      }}
      OfficeIncharge={{
        name: "Mr. R.K. Singh",
        role: "Assistant Warden",
        image: "/images/girlshostel/kc1.webp",
        phone: "+91 9123456780",
        email: "rksingh@univ.edu",
      }}
    />
  );
}