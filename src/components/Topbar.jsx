import React from 'react';
import DarkModeToggle from "./components/DarkModeToggle";



export default function Topbar(){
return (
<header className="flex items-center justify-between p-3 border-b bg-white">
<div className="flex items-center gap-3">
<div className="md:hidden">☰</div>
<h1 className="text-lg font-semibold">Church Management</h1>
</div>


<div className="flex items-center gap-3">
<div className="text-sm text-slate-500">Admin</div>
<div className="rounded-full bg-indigo-600 text-white w-8 h-8 flex items-center justify-center">A</div>
<DarkModeToggle />
</div>
</header>
)
}