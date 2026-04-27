"use client";

import { useEffect, useState } from "react";
import {
    Search,
    RefreshCw,
    BedDouble,
    Users,
    CheckCircle2,
    Clock3,
    X
} from "lucide-react";

type Application = {
    id: number;
    name: string;
    roll: string;
    email: string;
    hostel: string;
};

type Room = {
    id: number;
    room_number: string;
    capacity: number;
    occupied: number;
    available_beds: number;
};

const API = "http://localhost:8000/hms";

export default function ApplicationsPage() {

    const [
        applications,
        setApplications
    ] = useState<Application[]>([]);

    const [
        rooms,
        setRooms
    ] = useState<Room[]>([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        selectedApp,
        setSelectedApp
    ] = useState<Application | null>(
        null
    );

    const [
        selectedRoom,
        setSelectedRoom
    ] = useState("");

    const [
        allocating,
        setAllocating
    ] = useState(false);

    const [
        search,
        setSearch
    ] = useState("");

    const token = () => localStorage.getItem(
        "access"
    );



    useEffect(() => {
        fetchApplications();
    }, []);



    async function fetchApplications() {

        try {

            setLoading(true);

            const res = await fetch(
                `${API}/applications/pending/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token()}`
                    }
                }
            );

            const data =
                await res.json();

            setApplications(data);

        } catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }

    }



    async function loadRooms() {

        const res = await fetch(
            `${API}/allocations/rooms/available/`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token()}`
                }
            }
        );

        const data =
            await res.json();

        setRooms(data);

    }



    async function openDrawer(
        app: Application
    ) {
        setSelectedApp(app);
        await loadRooms();
    }



    async function approveAndAllocate() {

        if (!selectedRoom) {
            alert(
                "Select room first"
            );
            return;
        }

        try {

            setAllocating(true);

            const res = await fetch(
                `${API}/allocations/manual-approve/${selectedApp?.id}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token()}`
                    },
                    body: JSON.stringify({
                        room_id: selectedRoom
                    })
                }
            );

            const data =
                await res.json();

            if (!res.ok) {
                alert(
                    data.error
                );
                return;
            }

            setApplications(
                prev =>
                    prev.filter(
                        a => a.id !== selectedApp?.id
                    )
            );

            setSelectedApp(null);
            setSelectedRoom("");

        }
        finally {
            setAllocating(false);
        }

    }



    const filtered =
        applications.filter(
            a =>
                a.name.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
                ||
                a.roll.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );



    if (loading) {
        return (
            <div className="
min-h-screen
bg-slate-50
p-10
">
                Loading...
            </div>
        )
    }



    return (

        <div className="
min-h-screen
bg-slate-100
p-8
space-y-8
">


            {/* Hero */}
            <section className="
rounded-[36px]
bg-gradient-to-r
from-[#8B1D2C]
via-[#a02839]
to-[#c94c5c]
text-white
p-10
shadow-2xl
">

                <div className="
flex
justify-between
items-center
flex-wrap
gap-6
">

                    <div>

                        <h1 className="
text-5xl
font-bold
">
                            Application Approval Panel
                        </h1>

                        <p className="
mt-4
text-red-100
text-lg
">
                            Review, verify and allocate hostel rooms
                        </p>

                    </div>


                    <button
                        onClick={fetchApplications}
                        className="
bg-white/20
rounded-2xl
px-6
py-4
font-semibold
flex
items-center
gap-3
hover:bg-white/30
"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>

                </div>

            </section>




            {/* Stats */}
            <section className="
grid
md:grid-cols-4
gap-6
">

                <StatCard
                    title="Pending"
                    value={applications.length}
                    icon={<Clock3 />}
                />

                <StatCard
                    title="Rooms"
                    value={rooms.length}
                    icon={<BedDouble />}
                />

                <StatCard
                    title="Applicants"
                    value={applications.length}
                    icon={<Users />}
                />

                <StatCard
                    title="Approved"
                    value="18"
                    icon={<CheckCircle2 />}
                />

            </section>




            {/* Search */}
            <div className="
bg-white
rounded-3xl
shadow
border
p-6
flex
items-center
gap-4
">

                <Search className="
text-slate-400
"/>

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="
Search applications...
"
                    className="
flex-1
outline-none
text-lg
text-gray-800
"
                />

            </div>




            {/* Workflow */}
            <section className="
grid
md:grid-cols-3
gap-6
">

                <StepCard
                    step="1"
                    title="Pending Review"
                />

                <StepCard
                    step="2"
                    title="Allocate Room"
                />

                <StepCard
                    step="3"
                    title="Approve Student"
                />

            </section>




            {/* Table */}
            <div className="
bg-white
rounded-[32px]
shadow
border
overflow-hidden
">

                <div className="
p-8
border-b
">

                    <h2 className="
text-2xl
font-bold
text-gray-800
">
                        Pending Applications
                    </h2>

                </div>


                <div className="
overflow-x-auto
">

                    <table className="w-full">

                        <thead className="
bg-slate-50
text-gray-600
">
                            <tr>
                                <th className="p-6 text-left">
                                    Student
                                </th>

                                <th className="p-6 text-left">
                                    Roll
                                </th>

                                <th className="p-6 text-left">
                                    Email
                                </th>

                                <th className="p-6 text-left">
                                    Status
                                </th>

                                <th className="p-6 text-left">
                                    Action
                                </th>

                            </tr>
                        </thead>


                        <tbody>

                            {filtered.length ?

                                filtered.map(
                                    app => (
                                        <tr
                                            key={app.id}
                                            className="
border-t
hover:bg-slate-50
"
                                        >

                                            <td className="p-6">
                                                <p className="
font-semibold
text-gray-900
">
                                                    {app.name}
                                                </p>

                                                <p className="
text-sm
text-gray-500
">
                                                    Hostel Applicant
                                                </p>
                                            </td>


                                            <td className="
p-6
font-medium
text-gray-800
">
                                                {app.roll}
                                            </td>


                                            <td className="
p-6
text-gray-700
">
                                                {app.email}
                                            </td>


                                            <td className="p-6">
                                                <span className="
px-4
py-2
rounded-full
bg-amber-100
text-amber-700
text-sm
font-semibold
">
                                                    Pending
                                                </span>
                                            </td>


                                            <td className="p-6">

                                                <button
                                                    onClick={() =>
                                                        openDrawer(app)
                                                    }
                                                    className="
bg-gradient-to-r
from-[#8B1D2C]
to-[#b63f50]
text-white
rounded-2xl
px-5
py-3
font-semibold
hover:scale-105
transition
"
                                                >
                                                    Allocate Room
                                                </button>

                                            </td>

                                        </tr>
                                    )
                                )

                                :

                                <tr>
                                    <td
                                        colSpan={5}
                                        className="
text-center
p-20
text-gray-500
"
                                    >
                                        No pending applications
                                    </td>
                                </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>




            {/* Drawer */}
            {selectedApp && (

                <div className="
fixed
inset-0
z-50
">

                    <div
                        onClick={() =>
                            setSelectedApp(null)
                        }
                        className="
absolute
inset-0
bg-black/40
"
                    />


                    <div className="
absolute
right-0
top-0
h-full
w-[560px]
bg-white
shadow-2xl
p-8
overflow-y-auto
">

                        <div className="
flex
justify-between
items-center
mb-8
">

                            <h2 className="
text-3xl
font-bold
">
                                Allocate Room
                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedApp(null)
                                }
                            >
                                <X />
                            </button>

                        </div>



                        <div className="
rounded-3xl
bg-slate-50
p-6
mb-8
space-y-3
">

                            <p>
                                <b>Name:</b>
                                {" "}
                                {selectedApp.name}
                            </p>

                            <p>
                                <b>Roll:</b>
                                {" "}
                                {selectedApp.roll}
                            </p>

                        </div>



                        <h3 className="
font-semibold
text-lg
mb-4
">
                            Select Available Room
                        </h3>



                        <div className="
space-y-4
">

                            {rooms.map(
                                room => (

                                    <button
                                        key={room.id}
                                        onClick={() =>
                                            setSelectedRoom(
                                                String(room.id)
                                            )
                                        }
                                        className={`
w-full
rounded-3xl
border-2
p-5
text-left
transition
${selectedRoom === String(room.id)
                                                ?
                                                "border-[#8B1D2C] bg-red-50"
                                                :
                                                "border-slate-200"
                                            }
`}
                                    >

                                        <div className="
flex
justify-between
">
                                            <div>

                                                <h4 className="
font-semibold
text-lg
">
                                                    Room
                                                    {" "}
                                                    {room.room_number}
                                                </h4>

                                                <p className="
text-gray-500
">
                                                    {room.available_beds}
                                                    beds free
                                                </p>

                                            </div>

                                            <div>
                                                {room.occupied}/
                                                {room.capacity}
                                            </div>

                                        </div>

                                        <div className="
w-full
bg-slate-200
h-2
rounded-full
mt-4
">

                                            <div
                                                style={{
                                                    width:
                                                        `${(room.occupied /
                                                            room.capacity) * 100}%`
                                                }}
                                                className="
h-2
rounded-full
bg-[#8B1D2C]
"
                                            />

                                        </div>

                                    </button>

                                )
                            )}

                        </div>



                        <button
                            onClick={
                                approveAndAllocate
                            }
                            disabled={
                                allocating
                            }
                            className="
w-full
mt-8
py-4
rounded-2xl
text-white
font-semibold
text-lg
bg-gradient-to-r
from-green-600
to-emerald-500
"
                        >

                            {
                                allocating
                                    ?
                                    "Allocating..."
                                    :
                                    "Approve & Allot Room"
                            }

                        </button>


                    </div>

                </div>

            )}

        </div>

    )

}



function StatCard({
    title,
    value,
    icon
}: any) {

    return (
        <div className="
bg-white
rounded-3xl
shadow
border
p-7
flex
justify-between
items-center
">

            <div>
                <p className="
text-gray-500
">
                    {title}
                </p>

                <h2 className="
text-4xl
font-bold
mt-2
text-gray-900
">
                    {value}
                </h2>
            </div>

            <div className="
bg-red-100
p-4
rounded-2xl
text-[#8B1D2C]
">
                {icon}
            </div>

        </div>
    )
}



function StepCard({
    step,
    title
}: any) {

    return (
        <div className="
bg-white
rounded-3xl
shadow
border
p-7
">

            <div className="
w-12
h-12
rounded-full
bg-[#8B1D2C]
text-white
flex
items-center
justify-center
font-bold
mb-4
">
                {step}
            </div>

            <h3 className="
text-xl
font-semibold
text-gray-800
">
                {title}
            </h3>

        </div>
    )
}