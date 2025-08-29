import React, { useEffect, useState, useRef } from 'react'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'
export default function Certifications(){
  const [data,setData]=useState<any>(null)
  const refScroll = useRef<HTMLDivElement>(null)
  useEffect(()=>{ get(ref(db,'certifications')).then(s=>{ if(s.exists()) setData(s.val()) }) },[])
  if(!data) return <section className="section"><div className="container">Loading certifications...</div></section>
  const scroll=(dir:'left'|'right')=>{ if(refScroll.current){ const w=refScroll.current.clientWidth; refScroll.current.scrollBy({left: dir==='left'?-w:w, behavior:'smooth'}) } }
  return (
    <section id="certifications" className="section">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">{data.title}</h2>
        <div className="relative">
          <button onClick={()=>scroll('left')} className="absolute left-0 top-1/2">‹</button>
          <div ref={refScroll} className="flex gap-6 overflow-x-auto py-4">
            {data.items?.map((c:any,i:number)=>(<a key={i} href={c.link} className="min-w-[280px] card"><img src={c.img} alt={c.title} className="w-full h-44 object-cover"/><h3 className="mt-3 font-semibold text-center">{c.title}</h3></a>))}
          </div>
          <button onClick={()=>scroll('right')} className="absolute right-0 top-1/2">›</button>
        </div>
      </div>
    </section>
  )
}
