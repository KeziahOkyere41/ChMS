import React from 'react'
import { events as sample } from '../data/mock'


export default function Events(){
return (
<div className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-lg font-semibold">Events</h2>
<div className="text-sm text-slate-500">Manage upcoming events and volunteer lists</div>
</div>


<div className="bg-white p-4 rounded">
<ul className="space-y-2">
{sample.map(e => (
<li key={e.id} className="p-2 border rounded flex items-center justify-between">
<div>
<div className="font-medium">{e.title}</div>
<div className="text-xs text-slate-500">{e.date}</div>
</div>
<div className="text-xs text-slate-500">{e.attendees} attending</div>
</li>
))}
</ul>
</div>
</div>
)
}