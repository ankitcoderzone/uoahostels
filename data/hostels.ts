
export type Gender = "boys" | "girls";

export interface HostelConfig {
  name: string;
  logo: string;
  color: string;
  gender: Gender;
  modules: Array<"students" | "rooms" | "notices" | "feedback">;
}

export const HOSTELS: Record<string, HostelConfig> = {
  // "amaranatha-jha-hostel": {
  //   name: "Amaranatha Jha Hostel",
  //   color: "#8B1D2C",
  //   logo: "/images/sirgnjha/g-n-jha.jpeg",
  //   gender: "boys",
  //   modules: ["students", "rooms", "notices"],
  // },
  // "diamond-jubilee-hostel": {
  //   name: "Diamond Jubilee Hostel",
  //   color: "#1E3A8A",
  //   logo: "/images/sirgnjha/g-n-jha.jpeg",
  //   gender: "boys",
  //   modules: ["students", "rooms"],
  // },
  // "holland-hall-hostel": {
  //   name: "Holland Hall Hostel",
  //   color: "#065F46",
  //   logo: "/images/sirgnjha/g-n-jha.jpeg",
  //   gender: "boys",
  //   modules: ["students", "rooms", "notices", "feedback"],
  // },
  "sir-gn-jha-hostel": {
    name: "Sir G.N. Jha Hostel",
    color: "#7C2D12",
    logo: "/images/boyshostels/gn.jpeg",
    gender: "boys",
    modules: ["students", "rooms", "feedback"],
  },
  // "shatabdi-boys-hostel": {
  //   name: "Shatabdi Boys Hostel",
  //   color: "#374151",
  //   logo: "/images/sirgnjha/g-n-jha.jpeg",
  //   gender: "boys",
  //   modules: ["students", "rooms"],
  // },



  // Example Girls Hostel
  // "sarojini-naidu-girls-hostel": {
  //   name: "Sarojini Naidu Girls Hostel",
  //   color: "#9D174D",
  //   logo: "/images/girlshostel/snaidu.jpeg",
  //   gender: "girls",
  //   modules: ["students", "rooms", "notices"],
  // },
  "Kalpana-Chawala-Hostel": {
    name: "Kalpana Chawala Hostel",
    color: "#9D174D",
    logo: "/images/girlshostel/kc2.jpeg",
    gender: "girls",
    modules: ["students", "rooms", "notices"],
  },
};

