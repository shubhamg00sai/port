import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'
export default function Projects(){
  const [data,setData]=useState<any>(null)
  useEffect(()=>{ get(ref(db,'projects')).then(s=>{ if(s.exists()) setData(s.val()) }) },[])
  if(!data) return <section className="section"><div className="container">Loading projects...</div></section>
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">{data.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.items?.map((p:any,i:number)=>(
            <motion.a key={i} href={p.link} className="card group overflow-hidden" initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}}>
              <img src={p.img} alt={p.title} className="w-full h-44 object-cover rounded"/>
              <h3 className="mt-3 font-semibold">{p.title}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
