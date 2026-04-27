"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProfileData = {
    student: {
        name: string;
        roll: string;
        email: string;
        mobile: string;
    };

    hostel: {
        name: string;
    };

    room: {
        room_number: string;
        room_type: string;
        bed_no: number;
    };
};


export default function Profile() {

    const router = useRouter();

    const [data, setData] = useState<
        ProfileData | null
    >(null);

    const [loading, setLoading] =
        useState(true);



    async function fetchProfile() {

        const token =
            localStorage.getItem(
                "access"
            );

        if (!token) {
            router.push(
                "/student-login"
            );
            return;
        }


        try {

            const res = await fetch(
                "https://hms-wyso.onrender.com/hms/accounts/auth/student/dashboard/",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            if (res.status === 401) {

                localStorage.removeItem(
                    "access"
                );

                localStorage.removeItem(
                    "refresh"
                );

                router.push(
                    "/student-login"
                );

                return;
            }


            const result =
                await res.json();

            setData(result);

        } catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    }



    useEffect(() => {
        fetchProfile();
    }, []);



    if (loading) {
        return (
            <div className="
min-h-[60vh]
flex
items-center
justify-center
text-lg
font-semibold
text-gray-700
">
                Loading Profile...
            </div>
        )
    }



    if (!data) {
        return (
            <div className="
min-h-[60vh]
flex
items-center
justify-center
text-xl
text-gray-700
">
                Profile unavailable
            </div>
        )
    }



    return (

        <div className="
max-w-7xl
mx-auto
space-y-10
">


            {/* Top Welcome Banner */}
            <section className="
rounded-3xl
bg-gradient-to-r
from-[#8B1D2C]
to-[#b33f4f]
text-white
p-8
shadow-xl
">

                <h1 className="
text-4xl
font-bold
">
                    {data.student.name}
                </h1>

                <p className="
mt-3
text-red-100
">
                    Resident Student Profile
                </p>


                <div className="
grid
md:grid-cols-3
gap-6
mt-8
">

                    <BannerCard
                        label="Roll Number"
                        value={data.student.roll}
                    />

                    <BannerCard
                        label="Hostel"
                        value={data.hostel.name}
                    />

                    <BannerCard
                        label="Room"
                        value={data.room.room_number}
                    />

                </div>

            </section>




            <div className="
grid
lg:grid-cols-2
gap-8
">


                {/* Personal */}
                <div className="
bg-white
rounded-3xl
shadow-lg
p-8
border
">

                    <h2 className="
text-2xl
font-bold
text-gray-800
mb-6
">
                        Personal Information
                    </h2>

                    <div className="space-y-4">

                        <InfoRow
                            label="Student Name"
                            value={data.student.name}
                        />

                        <InfoRow
                            label="Roll Number"
                            value={data.student.roll}
                        />

                        <InfoRow
                            label="Email"
                            value={data.student.email}
                        />

                        <InfoRow
                            label="Mobile"
                            value={data.student.mobile}
                        />

                    </div>

                </div>




                {/* Hostel */}
                <div className="
bg-white
rounded-3xl
shadow-lg
p-8
border
">

                    <h2 className="
text-2xl
font-bold
text-gray-800
mb-6
">
                        Hostel Allocation
                    </h2>

                    <div className="space-y-4">

                        <InfoRow
                            label="Hostel"
                            value={data.hostel.name}
                        />

                        <InfoRow
                            label="Room Number"
                            value={data.room.room_number}
                        />

                        <InfoRow
                            label="Bed Number"
                            value={data.room.bed_no}
                        />

                        <InfoRow
                            label="Room Type"
                            value={data.room.room_type}
                        />

                    </div>

                </div>


            </div>




            {/* Status */}
            <section className="
bg-white
rounded-3xl
shadow-lg
p-8
">

                <h2 className="
text-2xl
font-bold
text-gray-800
mb-6
">
                    Resident Status
                </h2>

                <div className="
grid
md:grid-cols-3
gap-6
">

                    <StatusCard
                        title="Hostel Status"
                        status="Active"
                    />

                    <StatusCard
                        title="Allocation"
                        status="Confirmed"
                    />

                    <StatusCard
                        title="Verification"
                        status="Verified"
                    />

                </div>

            </section>

        </div>

    )

}



function BannerCard({
    label,
    value
}: any) {

    return (

        <div className="
bg-white/15
rounded-2xl
p-5
">

            <p className="
text-red-100
text-sm
">
                {label}
            </p>

            <h3 className="
text-2xl
font-bold
mt-2
">
                {value}
            </h3>

        </div>

    )

}



function InfoRow({
    label,
    value
}: any) {

    return (

        <div className="
flex
justify-between
border-b
pb-3
">

            <span className="
font-medium
text-gray-600
">
                {label}
            </span>

            <span className="
font-semibold
text-gray-900
">
                {value}
            </span>

        </div>

    )

}



function StatusCard({
    title,
    status
}: any) {

    return (

        <div className="
border
rounded-2xl
p-6
text-center
">

            <p className="
text-gray-500
">
                {title}
            </p>

            <h3 className="
text-xl
font-bold
text-green-600
mt-3
">
                {status}
            </h3>

        </div>

    )

}