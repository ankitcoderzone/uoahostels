"use client";

import {
    useEffect,
    useState,
    useCallback
} from "react";

import { useRouter } from "next/navigation";

type DashboardData = {
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


type ValueType =
    string | number;

type CardProps = {
    title: string;
    value: ValueType;
};

type BannerProps = {
    label: string;
    value: ValueType;
};

type InfoProps = {
    label: string;
    value: ValueType;
};

type StatusProps = {
    title: string;
    status: string;
};



export default function StudentDashboard() {

    const router = useRouter();

    const [
        data,
        setData
    ] = useState<
        DashboardData | null
    >(null);

    const [
        loading,
        setLoading
    ] = useState(true);



    const fetchDashboard =
        useCallback(
            async () => {

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

                    setData(
                        result
                    );

                }
                catch (err) {

                    console.error(
                        err
                    );

                }
                finally {

                    setLoading(
                        false
                    );

                }

            },
            [router]
        );



    useEffect(() => {

        const load = async () => {
            await fetchDashboard();
        };

        load();

    }, [fetchDashboard]);



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
                Loading Dashboard...
            </div>
        )
    }



    if (!data?.room) {
        return (
            <div className="
min-h-[60vh]
flex
items-center
justify-center
text-xl
font-medium
text-gray-700
">
                No room allocated yet.
            </div>
        )
    }



    return (

        <div className="space-y-10">

            <section className="
rounded-3xl
bg-gradient-to-r
from-[#8B1D2C]
to-[#b43d4e]
text-white
p-8
shadow-xl
">

                <h1 className="
text-4xl
font-bold
">
                    Welcome,
                    {" "}
                    {data.student.name}
                </h1>

                <p className="
mt-3
text-red-100
text-base
">
                    Student Resident Dashboard
                </p>


                <div className="
grid
md:grid-cols-3
gap-6
mt-8
">

                    <BannerStat
                        label="Hostel"
                        value={data.hostel.name}
                    />

                    <BannerStat
                        label="Room"
                        value={data.room.room_number}
                    />

                    <BannerStat
                        label="Bed"
                        value={data.room.bed_no}
                    />

                </div>

            </section>




            <section className="
grid
md:grid-cols-4
gap-6
">

                <Card
                    title="Room Number"
                    value={data.room.room_number}
                />

                <Card
                    title="Bed Number"
                    value={data.room.bed_no}
                />

                <Card
                    title="Room Type"
                    value={data.room.room_type}
                />

                <Card
                    title="Hostel"
                    value={data.hostel.name}
                />

            </section>




            <section className="
grid
lg:grid-cols-2
gap-8
">

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
                        Student Information
                    </h2>

                    <div className="space-y-4">

                        <InfoRow
                            label="Name"
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
                        Allocation Details
                    </h2>

                    <div className="space-y-4">

                        <InfoRow
                            label="Hostel"
                            value={data.hostel.name}
                        />

                        <InfoRow
                            label="Room"
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

            </section>




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
                        title="Admission"
                        status="Approved"
                    />

                    <StatusCard
                        title="Allocation"
                        status="Confirmed"
                    />

                    <StatusCard
                        title="Residency"
                        status="Active"
                    />

                </div>

            </section>

        </div>

    )

}




function Card({
    title,
    value
}: CardProps) {

    return (
        <div className="
bg-white
rounded-3xl
shadow-md
p-6
border
">

            <p className="
text-gray-500
font-medium
">
                {title}
            </p>

            <h3 className="
text-3xl
font-bold
text-gray-900
mt-3
">
                {value}
            </h3>

        </div>
    )

}



function BannerStat({
    label,
    value
}: BannerProps) {

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
}: InfoProps) {

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
}: StatusProps) {

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