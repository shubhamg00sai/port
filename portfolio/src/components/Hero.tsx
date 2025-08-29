import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'

export default function Hero(){
  const [hero, setHero] = useState<any>(null)
  useEffect(()=>{ get(ref(db,'hero')).then(s=>{ if(s.exists()) setHero(s.val()) }) },[])
  if(!hero) return <section className="section min-h-screen"><div className="container text-center">Loading hero...</div></section>
  return (
    <section id="home" className="section min-h-screen flex items-center">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-5xl font-extrabold leading-tight" dangerouslySetInnerHTML={{__html:hero.title}} />
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="mt-6 max-w-xl text-slate-300">{hero.subtitle}</motion.p>
          <div className="mt-6 flex gap-3">
            <a href={hero.cta1?.link||'#'} className="btn bg-white/5">{hero.cta1?.text||'View Projects'}</a>
            <a href={hero.cta2?.link||'#'} className="btn border"> {hero.cta2?.text||'Resume'}</a>
          </div>
        </div>
        <div>
          <div className="card p-6">
            <div className="text-sm text-slate-400">Featured Project</div>
            <h3 className="mt-2 font-semibold">{hero.featured?.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{hero.featured?.desc}</p>
            {hero.featured?.link && <div className="mt-4"><a href={hero.featured.link} className="px-3 py-2 rounded bg-teal-400 text-black">Live demo</a></div>}
          </div>
        </div>
      </div>
    </section>
  )
}
