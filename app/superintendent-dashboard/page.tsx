"use client";

import { useEffect } from "react";
import { Menu, X, LogOut, BedDouble, Users, ClipboardCheck, FileSpreadsheet } from "lucide-react";
import { useState } from "react";

type User = {
    name: string;
    hostel_name?: string;
    role: string;
};

const modules = [
    {
        title: "ROOMS",
        icon: BedDouble,
        href: "/superintendent-dashboard/rooms",
    },
    {
        title: "STUDENTS",
        icon: Users,
        href: "/superintendent-dashboard/students",
    },
    {
        title: "APPLICATIONS",
        icon: ClipboardCheck,
        href: "/superintendent-dashboard/applications",
    },

    {
        title: "ALLOCATION DETAILS",
        icon: FileSpreadsheet,
        href: "/superintendent-dashboard/allocations",
    },
];


export default function StaffDashboard() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [clock, setClock] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("access");


        // No token -> login
        if (!token) {
            window.location.replace("/admin-login");
            return;
        }


        // Validate token + get user
        const fetchUser = async () => {
            try {

                const res = await fetch(
                    "https://hms-wyso.onrender.com/hms/accounts/auth/me/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );


                // invalid or expired token
                if (!res.ok) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");

                    window.location.replace("/admin-login");
                    return;
                }

                const data = await res.json();

                setUser(data);

            } catch (error) {
                console.error(error);

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.replace("/admin-login");
            }
        };



        fetchUser();



        // Live Clock
        const updateClock = () => {
            setClock(
                new Date().toLocaleString(
                    "en-IN",
                    {
                        dateStyle: "medium",
                        timeStyle: "medium",
                    }
                )
            );
        };

        updateClock();

        const timer = setInterval(
            updateClock,
            1000
        );


        return () => clearInterval(timer);

    }, []);



    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/admin-login";
    };



    return (

        <div className="
min-h-screen
bg-slate-100
">

            {/* Top Header */}
            <header className="
bg-[#c20c27]
shadow-lg
h-24
">

                <div className="
max-w-7xl
mx-auto
h-full
px-4 md:px-8
flex
items-center
justify-between
">

                    {/* Left */}
                    <div className="
flex items-center gap-4
min-w-0
">

                        <button
                            onClick={() => setMobileOpen(true)}
                            className="
md:hidden
text-white
"
                        >
                            <Menu size={30} />
                        </button>

                        <div className="min-w-0">
                            <h2 className="
text-white
font-bold
text-lg md:text-2xl
truncate
">
                                {user?.hostel_name || "Sir G.N Jha Hostel"}
                            </h2>

                            <p className="
text-white/90
text-xs md:text-sm
truncate
">
                                {clock}
                            </p>
                        </div>

                    </div>



                    {/* Center */}
                    <div className="
hidden md:block
">
                        <h1 className="
text-4xl
font-black
tracking-tight
text-white
">
                            Dashboard
                        </h1>
                    </div>



                    {/* Desktop Right */}
                    <div className="
hidden md:flex
items-center
gap-5
">

                        <div className="
bg-white/15
rounded-2xl
px-5 py-3
text-white
">
                            <p className="text-xs">
                                Logged in as
                            </p>

                            <h3 className="
font-bold
text-base
">
                                {user?.name || "Superintendent"}
                            </h3>
                        </div>


                        <button
                            onClick={logout}
                            className="
flex items-center gap-2
bg-slate-800
hover:bg-slate-900
text-white
px-5 py-3
rounded-2xl
font-semibold
"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>

                    </div>



                    {/* Mobile right small badge */}
                    <div className="
md:hidden
text-white
font-semibold
text-sm
truncate
max-w-[120px]
">
                        {user?.name || "Staff"}
                    </div>

                </div>
            </header>
            {mobileOpen && (
                <>
                    <div
                        onClick={() => setMobileOpen(false)}
                        className="
fixed inset-0
bg-black/50
z-40
"
                    />

                    <div className="
fixed
top-0 right-0
h-full
w-80
bg-white
z-50
shadow-2xl
p-8
">

                        <div className="
flex
justify-between
items-center
mb-10
">
                            <h2 className="
text-2xl
font-bold
text-slate-900
">
                                Profile
                            </h2>

                            <button
                                onClick={() => setMobileOpen(false)}
                            >
                                <X size={28} />
                            </button>

                        </div>


                        <div className="
space-y-6
">

                            <div className="
bg-slate-100
rounded-3xl
p-6
">
                                <p className="text-slate-600">
                                    Hostel
                                </p>

                                <h3 className="
font-bold
text-xl
text-slate-900
">
                                    {user?.hostel_name}
                                </h3>
                            </div>


                            <div className="
bg-slate-100
rounded-3xl
p-6
">
                                <p className="text-slate-600">
                                    Logged User
                                </p>

                                <h3 className="
font-bold
text-xl
text-slate-900
">
                                    {user?.name}
                                </h3>

                                <p className="text-slate-700">
                                    {user?.role}
                                </p>
                            </div>



                            <button
                                onClick={logout}
                                className="
w-full
bg-[#c20c27]
text-white
py-4
rounded-2xl
font-bold
"
                            >
                                Logout
                            </button>

                        </div>

                    </div>
                </>
            )}



            {/* Main Modules */}
            <main className="
max-w-7xl
mx-auto
px-6 md:px-10
py-16
">

                <h2 className="
text-center
text-3xl md:text-4xl
font-bold
text-slate-800
mb-14
">
                    Hostel Management
                </h2>


                <div
                    className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-20
"
                >

                    {modules.map(item => {

                        const Icon = item.icon;

                        return (

                            <a
                                key={item.title}
                                href={item.href}
                                className="
group
flex
justify-center
"
                            >

                                <div className="relative inline-flex flex-col items-center">

                                    {/* Icon Circle */}
                                    <div className="
w-40 h-40
rounded-full
bg-gradient-to-br
from-yellow-300
to-orange-400
flex items-center justify-center
shadow-lg
group-hover:scale-105
transition
">

                                        <Icon
                                            size={70}
                                            strokeWidth={2.2}
                                            className="text-slate-800"
                                        />

                                    </div>


                                    {/* Center Floating Label */}
                                    <div className="
absolute
-top-[-0px]
translate-y-[130px]
bg-purple-600
group-hover:bg-purple-700
text-white
font-bold
text-lg md:text-xl
rounded-2xl
px-8 py-3
shadow-xl
whitespace-nowrap
transition
">
                                        {item.title}
                                    </div>

                                </div>

                            </a>

                        )

                    })}

                </div>





            </main>

        </div>

    )

}