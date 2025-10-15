import React from 'react'
import { donations as sample } from '../data/mock'


export default function Giving(){
const total = sample.reduce((s,d)=> s + d.amount, 0)
return (
<div className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-lg font-semibold">Giving</h2>
<div className="text-sm font-medium">Total GHS {total.toFixed(2)}</div>
</div>


<div className="bg-white p-4 rounded">
<ul className="space-y-2">
{sample.map(d => (
<li key={d.id} className="flex items-center justify-between border p-2 rounded">
<div>
<div className="font-medium">{d.donor}</div>
<div className="text-xs text-slate-500">{d.date}</div>
</div>
<div className="font-medium">GHS {d.amount.toFixed(2)}</div>
</li>
))}
</ul>
</div>
</div>
)
}