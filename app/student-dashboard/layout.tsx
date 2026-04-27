"use client";

import {
    useEffect,
    useState,
    useCallback
} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentLayout({
    children
}: {
    children: React.ReactNode
}) {

    const router = useRouter();

    const [
        checkingAuth,
        setCheckingAuth
    ] = useState(true);

    const [
        studentName,
        setStudentName
    ] = useState("Student");



    const logout =
        useCallback(() => {

            localStorage.removeItem(
                "access"
            );

            localStorage.removeItem(
                "refresh"
            );

            localStorage.removeItem(
                "studentAuth"
            );

            localStorage.removeItem(
                "studentUsername"
            );

            router.replace(
                "/student-login"
            );

        }, [router]);



    const fetchStudent =
        useCallback(
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "access"
                        );

                    if (!token) {
                        logout();
                        return;
                    }


                    const res = await fetch(
                        "https://hms-wyso.onrender.com/hms/accounts/auth/student/dashboard/",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                    if (
                        res.status === 401
                    ) {
                        logout();
                        return;
                    }


                    const data =
                        await res.json();


                    if (
                        data?.student?.name
                    ) {
                        setStudentName(
                            data.student.name
                        );
                    }

                }
                catch (err) {

                    console.error(
                        err
                    );

                }
                finally {

                    setCheckingAuth(
                        false
                    );

                }

            },
            [logout]
        );



    useEffect(() => {

        const access =
            localStorage.getItem(
                "access"
            );

        const refresh =
            localStorage.getItem(
                "refresh"
            );


        if (
            !access ||
            !refresh
        ) {

            router.replace(
                "/student-login"
            );

            return;

        }


        const load = async () => {
            await fetchStudent();
        };

        load();

    }, [
        fetchStudent,
        router
    ]);



    if (checkingAuth) {

        return (
            <div className="
min-h-screen
flex
items-center
justify-center
text-lg
font-semibold
text-gray-700
bg-gray-50
">
                Checking session...
            </div>
        )

    }



    return (

        <div className="
min-h-screen
flex
bg-slate-100
">

            <aside className="
w-72
bg-gradient-to-b
from-[#7c1527]
to-[#5c0f1d]
text-white
p-6
shadow-xl
">

                <div className="
pb-6
border-b
border-white/20
">

                    <h1 className="
text-2xl
font-bold
tracking-wide
">
                        Student Portal
                    </h1>

                    <p className="
text-sm
text-red-100
mt-2
">
                        Hostel Management System
                    </p>

                </div>




                <div className="
mt-8
bg-white/10
rounded-2xl
p-4
">

                    <p className="
text-sm
text-red-100
">
                        Logged in as
                    </p>

                    <h3 className="
text-lg
font-semibold
mt-1
text-white
">
                        {studentName}
                    </h3>

                </div>




                <nav className="
space-y-4
mt-8
">

                    <Link
                        href="/student-dashboard"
                        className="
block
rounded-xl
bg-white/10
hover:bg-white/20
px-5
py-3
font-medium
transition
"
                    >
                        Dashboard
                    </Link>


                    <Link
                        href="/student-dashboard/room"
                        className="
block
rounded-xl
bg-white/10
hover:bg-white/20
px-5
py-3
font-medium
transition
"
                    >
                        Room Details
                    </Link>


                    <Link
                        href="/student-dashboard/profile"
                        className="
block
rounded-xl
bg-white/10
hover:bg-white/20
px-5
py-3
font-medium
transition
"
                    >
                        Profile
                    </Link>

                </nav>




                <button
                    onClick={logout}
                    className="
mt-10
w-full
bg-white
text-[#7c1527]
font-semibold
py-3
rounded-xl
hover:bg-gray-100
transition
"
                >
                    Logout
                </button>

            </aside>




            <div className="flex-1">

                <header className="
bg-white
shadow-sm
border-b
px-10
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
                            Welcome,
                            {" "}
                            {studentName}
                        </h2>

                        <p className="
text-sm
text-gray-500
mt-1
">
                            Resident Student Dashboard
                        </p>

                    </div>



                    <div className="
hidden
md:flex
items-center
gap-4
">

                        <div className="
w-10
h-10
rounded-full
bg-[#8B1D2C]
text-white
flex
items-center
justify-center
font-bold
">
                            {studentName.charAt(0)}
                        </div>

                    </div>


                    <button
                        onClick={logout}
                        className="
md:hidden
border
px-4
py-2
rounded-lg
text-gray-700
"
                    >
                        Logout
                    </button>

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