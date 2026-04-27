"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SuperintendentLayout({
    children
}: {
    children: React.ReactNode
}) {

    const router = useRouter();

    const [
        checking,
        setChecking
    ] = useState(true);

    const [
        authorized,
        setAuthorized
    ] = useState(false);



    useEffect(() => {

        const verifyAuth = async () => {

            const token =
                localStorage.getItem(
                    "access"
                );

            if (!token) {
                router.replace(
                    "/superintendent-login"
                );
                return;
            }

            /* avoid direct setState inside effect lint issue */
            Promise.resolve().then(() => {
                setAuthorized(true);
                setChecking(false);
            });

        };

        verifyAuth();

    }, [router]);



    const logout = () => {

        localStorage.removeItem(
            "access"
        );

        localStorage.removeItem(
            "refresh"
        );

        router.replace(
            "/admin-login"
        );

    };



    if (checking) {
        return (
            <div className="
min-h-screen
flex
items-center
justify-center
text-lg
font-semibold
text-gray-700
">
                Checking session...
            </div>
        )
    }


    if (!authorized) {
        return null;
    }



    return (

        <div className="
min-h-screen
flex
bg-slate-100
">

            {/* Sidebar */}
            <aside className="
w-72
bg-gradient-to-b
from-[#8B1D2C]
to-[#61101d]
text-white
p-6
shadow-xl
">

                <h1 className="
text-2xl
font-bold
mb-8
">
                    Superintendent Panel
                </h1>


                <nav className="
space-y-4
">

                    <Link
                        href="/superintendent-dashboard"
                        className="
block
bg-white/10
hover:bg-white/20
rounded-xl
px-5
py-3
font-medium
"
                    >
                        Dashboard
                    </Link>


                    <Link
                        href="/superintendent-dashboard/applications"
                        className="
block
bg-white/10
hover:bg-white/20
rounded-xl
px-5
py-3
font-medium
"
                    >
                        Applications
                    </Link>


                    {/* <Link
                        href="/superintendent-dashboard/rooms"
                        className="
block
bg-white/10
hover:bg-white/20
rounded-xl
px-5
py-3
font-medium
"
                    >
                        Rooms
                    </Link> */}


                    {/* <Link
                        href="/superintendent-dashboard/students"
                        className="
block
bg-white/10
hover:bg-white/20
rounded-xl
px-5
py-3
font-medium
"
                    >
                        Residents
                    </Link> */}

                </nav>



                <button
                    onClick={logout}
                    className="
mt-10
w-full
bg-white
text-[#8B1D2C]
font-semibold
py-3
rounded-xl
"
                >
                    Logout
                </button>

            </aside>




            <div className="flex-1">

                <header className="
bg-white
border-b
shadow-sm
px-8
py-5
flex
justify-between
items-center
">

                    <div>

                        <h2 className="
text-2xl
font-bold
text-gray-800
">
                            Welcome Superintendent
                        </h2>

                        <p className="
text-sm
text-gray-500
mt-1
">
                            Hostel Administration Dashboard
                        </p>

                    </div>

                </header>



                <main className="
p-8
">
                    {children}
                </main>

            </div>

        </div>

    )

}