"use client";

import {
    useEffect,
    useState,
    useCallback
} from "react";

import { useRouter } from "next/navigation";

type RoomData = {
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


export default function RoomPage() {

    const router = useRouter();

    const [
        data,
        setData
    ] = useState<
        RoomData | null
    >(null);

    const [
        loading,
        setLoading
    ] = useState(true);



    const fetchRoom =
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

                } catch (error) {

                    console.error(
                        error
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
            await fetchRoom();
        };

        load();

    }, [fetchRoom]);



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
                Loading Room Details...
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
text-gray-700
">
                No room allocation found.
            </div>
        )
    }



    return (

        <div className="
max-w-7xl
mx-auto
space-y-10
">

            <section className="
rounded-3xl
bg-gradient-to-r
from-[#8B1D2C]
to-[#b33e4f]
text-white
p-8
shadow-xl
">

                <h1 className="
text-4xl
font-bold
">
                    Room Allocation
                </h1>

                <p className="
mt-3
text-red-100
">
                    Resident Accommodation Details
                </p>


                <div className="
grid
md:grid-cols-4
gap-6
mt-8
">

                    <BannerCard
                        label="Hostel"
                        value={data.hostel.name}
                    />

                    <BannerCard
                        label="Room"
                        value={data.room.room_number}
                    />

                    <BannerCard
                        label="Bed"
                        value={data.room.bed_no}
                    />

                    <BannerCard
                        label="Type"
                        value={data.room.room_type}
                    />

                </div>

            </section>



            <section className="
grid
md:grid-cols-4
gap-6
">

                <StatCard
                    title="Hostel"
                    value={data.hostel.name}
                />

                <StatCard
                    title="Room Number"
                    value={data.room.room_number}
                />

                <StatCard
                    title="Bed Number"
                    value={data.room.bed_no}
                />

                <StatCard
                    title="Room Type"
                    value={data.room.room_type}
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
border
p-8
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



                <div className="
bg-white
rounded-3xl
shadow-lg
border
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
space-y-6
">

                        <StatusCard
                            title="Allocation"
                            status="Confirmed"
                        />

                        <StatusCard
                            title="Residency"
                            status="Active"
                        />

                        <StatusCard
                            title="Verification"
                            status="Approved"
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
                    Hostel Room Rules
                </h2>

                <ul className="
space-y-4
text-gray-700
">

                    <li>
                        • Maintain room cleanliness and discipline.
                    </li>

                    <li>
                        • No unauthorized occupants allowed.
                    </li>

                    <li>
                        • Follow hostel timing regulations.
                    </li>

                    <li>
                        • Report maintenance issues promptly.
                    </li>

                    <li>
                        • Respect shared room privacy and conduct.
                    </li>

                </ul>

            </section>

        </div>

    )

}




function BannerCard({
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



function StatCard({
    title,
    value
}: CardProps) {

    return (
        <div className="
bg-white
rounded-3xl
shadow-md
border
p-6
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