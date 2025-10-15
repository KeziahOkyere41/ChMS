import React, { useState } from 'react'
import { members as initial } from '../data/mock'


export default function Members(){
const [members] = useState(initial)


return (
<div className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-lg font-semibold">Members</h2>
<div className="text-sm text-slate-500">{members.length} total</div>
</div>


<div className="bg-white rounded p-4">
<table className="w-full table-auto text-left">
<thead className="text-xs text-slate-500">
<tr>
<th className="p-2">Name</th>
<th className="p-2">Phone</th>
<th className="p-2">Role</th>
<th className="p-2">Joined</th>
</tr>
</thead>
<tbody>
{members.map(m => (
<tr key={m.id} className="border-t">
<td className="p-2">{m.name}</td>
<td className="p-2">{m.phone}</td>
<td className="p-2">{m.role}</td>
<td className="p-2">{m.joined}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)
}