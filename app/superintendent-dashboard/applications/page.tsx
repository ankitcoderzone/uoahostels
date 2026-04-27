"use client";

import {
useEffect,
useState,
useCallback
} from "react";

import {
Search,
RefreshCw,
BedDouble,
Users,
CheckCircle2,
Clock3,
X,
Check
} from "lucide-react";

type Application={
id:number;
name:string;
roll:string;
email:string;
hostel:string;
};

type Room={
id:number;
room_number:string;
capacity:number;
occupied:number;
available_beds:number;
};

type StatCardProps={
title:string;
value:string|number;
icon:React.ReactNode;
};

type StepCardProps={
step:string;
title:string;
};

const API=
"https://hms-wyso.onrender.com/hms";



export default function ApplicationsPage(){

const[
applications,
setApplications
]=useState<Application[]>([]);

const[
rooms,
setRooms
]=useState<Room[]>([]);

const[
loading,
setLoading
]=useState(true);

const[
selectedApp,
setSelectedApp
]=useState<Application|null>(
null
);

const[
selectedRoom,
setSelectedRoom
]=useState("");

const[
allocating,
setAllocating
]=useState(false);

const[
search,
setSearch
]=useState("");



const token=()=>localStorage.getItem(
"access"
);



const fetchApplications=
useCallback(
async()=>{

try{

setLoading(true);

const res=await fetch(
`${API}/applications/pending/`,
{
headers:{
Authorization:
`Bearer ${token()}`
}
}
);

const data=
await res.json();

setApplications(data);

}
catch(e){
console.error(e);
}
finally{
setLoading(false);
}

},
[]
);



useEffect(()=>{

fetchApplications();

},[fetchApplications]);



async function loadRooms(){

const res=await fetch(
`${API}/allocations/rooms/available/`,
{
headers:{
Authorization:
`Bearer ${token()}`
}
}
);

const data=
await res.json();

setRooms(data);

}



async function openDrawer(
app:Application
){
setSelectedApp(app);
await loadRooms();
}



async function approveAndAllocate(){

if(!selectedRoom){
alert(
"Please select a room"
);
return;
}

try{

setAllocating(true);

const res=await fetch(
`${API}/allocations/manual-approve/${selectedApp?.id}/`,
{
method:"POST",
headers:{
"Content-Type":
"application/json",
Authorization:
`Bearer ${token()}`
},
body:JSON.stringify({
room_id:selectedRoom
})
}
);

const data=
await res.json();

if(!res.ok){
alert(data.error);
return;
}

setApplications(
prev=>
prev.filter(
a=>a.id!==selectedApp?.id
)
);

setSelectedApp(null);
setSelectedRoom("");

alert(
"Room allocated successfully"
);

}
finally{
setAllocating(false);
}

}



const filtered=
applications.filter(
a=>
a.name.toLowerCase().includes(
search.toLowerCase()
)
||
a.roll.toLowerCase().includes(
search.toLowerCase()
)
);



if(loading){
return(
<div className="
min-h-screen
flex
items-center
justify-center
text-xl
font-semibold
text-gray-800
">
Loading Applications...
</div>
)
}



return(

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
Review pending applications and allocate hostel rooms
</p>
</div>

<button
onClick={fetchApplications}
className="
bg-white/20
hover:bg-white/30
rounded-2xl
px-6
py-4
font-semibold
flex
items-center
gap-3
"
>
<RefreshCw size={18}/>
Refresh
</button>

</div>

</section>



{/* stats */}
<section className="
grid
md:grid-cols-4
gap-6
">

<StatCard
title="Pending"
value={applications.length}
icon={<Clock3/>}
/>

<StatCard
title="Rooms"
value={rooms.length}
icon={<BedDouble/>}
/>

<StatCard
title="Applicants"
value={applications.length}
icon={<Users/>}
/>

<StatCard
title="Approved"
value="18"
icon={<CheckCircle2/>}
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

<Search className="text-gray-500"/>

<input
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
placeholder="Search by student or roll..."
className="
flex-1
outline-none
text-lg
font-medium
text-gray-900
"
/>

</div>



<section className="
grid
md:grid-cols-3
gap-6
">

<StepCard
step="1"
title="Review"
/>

<StepCard
step="2"
title="Allocate"
/>

<StepCard
step="3"
title="Approve"
/>

</section>



{/* Table */}
<div className="
bg-white
rounded-[32px]
shadow-xl
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
text-gray-900
">
Pending Applications
</h2>
</div>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="
bg-slate-50
text-gray-700
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

{filtered.map(app=>(
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
text-lg
">
{app.name}
</p>

<p className="
text-gray-600
">
Hostel Applicant
</p>
</td>

<td className="
p-6
font-medium
text-gray-900
">
{app.roll}
</td>

<td className="
p-6
text-gray-800
">
{app.email}
</td>

<td className="p-6">
<span className="
px-4
py-2
rounded-full
bg-amber-100
text-amber-800
font-semibold
">
Pending
</span>
</td>

<td className="p-6">
<button
onClick={()=>
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
"
>
Allocate Room
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>

</div>



{/* DRAWER */}
{selectedApp &&(

<div className="
fixed
inset-0
z-50
">

<div
onClick={()=>
setSelectedApp(null)
}
className="
absolute
inset-0
bg-black/50
"
/>

<div className="
absolute
right-0
top-0
h-full
w-[620px]
bg-white
shadow-2xl
overflow-y-auto
">

<div className="
sticky
top-0
bg-white
border-b
p-8
z-20
">

<div className="
flex
justify-between
items-center
">

<div>
<h2 className="
text-3xl
font-bold
text-gray-900
">
Allocate Room
</h2>

<p className="
text-gray-600
mt-2
">
Assign hostel room to applicant
</p>
</div>

<button
onClick={()=>
setSelectedApp(null)
}
className="
p-2
rounded-xl
hover:bg-slate-100
"
>
<X/>
</button>

</div>

</div>



<div className="p-8">

<div className="
bg-red-50
border
border-red-100
rounded-3xl
p-6
mb-8
space-y-3
text-gray-900
">

<p>
<b>Student:</b>
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
text-xl
font-bold
text-gray-900
mb-5
">
Select Available Room
</h3>



<div className="space-y-5">

{rooms.map(room=>(

<button
key={room.id}
onClick={()=>
setSelectedRoom(
String(room.id)
)
}
className={`
w-full
text-left
rounded-3xl
border-2
p-6
transition
${
selectedRoom===String(room.id)
?
"border-[#8B1D2C] bg-red-50 shadow-lg"
:
"border-slate-200 bg-white"
}
`}
>

<div className="
flex
justify-between
items-center
">

<div>
<h4 className="
text-xl
font-bold
text-gray-900
">
Room {room.room_number}
</h4>

<p className="
text-gray-700
mt-1
">
Available Beds:
{room.available_beds}
</p>
</div>

<div className="
text-lg
font-semibold
text-gray-800
">
{room.occupied}/{room.capacity}
</div>

</div>



<div className="
w-full
bg-slate-200
rounded-full
h-3
mt-5
">

<div
style={{
width:
`${(room.occupied/room.capacity)*100}%`
}}
className="
h-3
rounded-full
bg-[#8B1D2C]
"
/>

</div>


{selectedRoom===String(room.id)&&(
<div className="
mt-4
flex
items-center
gap-2
text-green-700
font-semibold
">
<Check size={18}/>
Selected
</div>
)}

</button>

))}

</div>



<button
onClick={approveAndAllocate}
disabled={allocating}
className="
w-full
mt-8
py-4
rounded-2xl
text-white
font-bold
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
"Approve & Allocate Room"
}
</button>

</div>

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
}:StatCardProps){

return(
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
text-gray-600
font-medium
">
{title}
</p>

<h2 className="
text-4xl
font-bold
text-gray-900
mt-2
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
}:StepCardProps){

return(
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
text-gray-900
">
{title}
</h3>

</div>
)
}