import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App(){
  const [dark, setDark] = useState(true)
  return (
    <div className={dark ? 'bg-[#0b1220] text-white' : 'bg-white text-black'}>
      <Navbar dark={dark} setDark={setDark}/>
      <main className="header-space">
        <Hero/>
        <Experience/>
        <Education/>
        <Skills/>
        <Projects/>
        <Certifications/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  )
}
