"use client";

import { useEffect, useState } from "react";

export default function DashboardLayout({
 children
}:{
 children:React.ReactNode
}){

const [checking,setChecking]=useState(true);

useEffect(()=>{

const token=localStorage.getItem("access");

if(!token){
 window.location.replace("/admin-login");
 return;
}

setChecking(false);

},[]);


if(checking){
 return null;
// or loading spinner
}

return children;

}