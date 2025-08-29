import React, { useEffect, useState } from 'react'
import { ref, get } from 'firebase/database'
import { db } from '../firebase'

export default function Navbar({dark,setDark}:{dark:boolean,setDark:(v:boolean)=>void}){
  const [nav, setNav] = useState<any>(null)
  useEffect(()=>{ get(ref(db,'navbar')).then(s=>{ if(s.exists()) setNav(s.val()) }) },[])
  const links = nav?.links ?? [{id:'home',label:'Home'},{id:'experience',label:'Experience'},{id:'education',label:'Education'},{id:'skills',label:'Skills'},{id:'projects',label:'Projects'},{id:'certifications',label:'Certifications'},{id:'contact',label:'Contact'}]
  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-black/20 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <a href="#home" className="text-2xl font-bold">{nav?.brand ?? 'Shubham'}<span style={{color:'var(--accent)'}}>{nav?.brandAccent ?? '.'}</span></a>
        <nav className="hidden md:flex gap-6 items-center">
          {links.map((l:any)=>(<a key={l.id} href={'#'+l.id} className="capitalize hover:text-white/90">{l.label}</a>))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={()=> setDark(!dark)} className="px-3 py-1 rounded bg-white/5">{dark? 'Light':'Dark'}</button>
        </div>
      </div>
    </header>
  )
}
