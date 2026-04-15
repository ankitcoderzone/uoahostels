import HostelPageTemplate from "@/components/HostelPageTemplate";

export default function SirGNJhaPage() {
  return (
    <HostelPageTemplate
      name="Sir G.N. Jha Hostel"
      description="Ganga Nath Jha Hostel, one of the University of Allahabad's leading hostels, was the University's fourth hostel. On November 12, 1927, Sir William Sinclair Marris, the Chancellor, laid the cornerstone for what was once known as New Hostel. In 1929, the hostel was renamed Sir Ganga Nath Jha Hostel to honour the intellectual giant and profound scholar. During the independence struggle, the G. N. Jha Hostel was the site of several nationalist events. On Saturdays, whenever Pandit Jawaharlal Nehru was in town, he would often visit the hostel and address the students there. Since its beginnings, the hostel has attracted exceptionally gifted students. During the past several decades of its existence, it has contributed to enriching campus and national life. The hostel has produced brilliant students, renowned academicians, capable administrators, legal luminaries, etc. Some of the distinguished ex-inmates include Gopal Swarup Pathak, former Vice President of India; Dharma Vira, ex-Home Secretary, Govt. of India and former Governor of West Bengal and Karnataka; Lakshmi Mal Singhvi, an eminent jurist; and Prof. P.C. Chaturvedi, Head, Department of Mathematics, University of Allahabad. Dr. I.P. Singh, I.F.S.; V.K. Singh, Home Secretary, Govt. of Bihar; V.K Saxena, Finance Secretary, Govt. of Uttar Pradesh; T.P. Singh, I.G. Railways Bihar; are only a few of the notable names in Central and State services. Eminent University professors have always been associated with the management of the hostel.
      
      Prof. A.C. Banerjee, Dr. Gorakh Prasad, Dr. Satya Prakash, Dr. S.P. Tandon, and Dr. P.D. Hajela are among the distinguished wardens. Notable superintendents of the hostel include Col. S.G. Tewari, Dr. A.P. Khattri, Prof. O.P. Bhatnagar, Dr. B.M. Singh, and Major A.S. Taiwan, among others. Residents of the hostel still hold fond memories of the time they spent here. They always referred to the hostel as the 'Sir Ganga Nath Jha Home.' They despise the sheer mention of the word 'hostel.'"
      images={[
        "/images/boyshostels/gnjha.jpeg",
        "/images/boyshostels/gnbanner1.jpg",
        "/images/boyshostels/gnbaner2.jpg",
      ]}
      warden={{
        name: "Dr. Manoj Kumar",
        role: "Professor, Department of English",
        image: "/images/boyshostels/gnjha.jpeg",
        phone: "+91 9876543245",
        email: "manoj@univ.edu",
      }}
      superintendent={{
        name: "Dr. Narsingh Kumar",
        role: "Professor, Department of Pyschology",
        image: "/images/boyshostels/gnsuper.jpg",
        phone: "+91 7317629594",
        email: "narsinghkumar@univ.edu",
      }}
      assistant={{
        name: "Dr. Sarvesh Singh",
        role: "Professor",
        image: "/images/boyshostels/gnjha.jpeg",
        phone: "+91 9123456780",
        email: "rksingh@univ.edu",
      }}
      OfficeIncharge={{
        name: "Mohit Singh",
        role: "Office Incharge",
        image: "/images/boyshostels/gnjha.jpeg",
        phone: "+91 9123456780",
        email: "rksingh@univ.edu",
      }}
    />
  );
}