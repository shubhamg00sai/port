import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <h1 className="font-bold text-xl">Shubham<span className="text-indigo-600">.</span></h1>
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#projects" className="hover:text-indigo-600">Projects</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-12">
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm uppercase text-indigo-600 font-semibold">Open to work</p>
            <h2 className="text-4xl font-extrabold mt-4">Building modern web & mobile apps</h2>
            <p className="mt-4 text-slate-600">Fresher Full Stack & App Developer — TypeScript, React, Node, Firebase.</p>
            <div className="mt-6 flex gap-3">
              <a className="px-4 py-2 rounded-lg bg-indigo-600 text-white" href="#projects">View Projects</a>
              <a className="px-4 py-2 rounded-lg border" href="#contact">Contact</a>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="h-56 bg-white rounded-md flex items-center justify-center">Hero / Avatar</div>
          </div>
        </section>

        <section id="projects" className="mt-16">
          <h3 className="text-2xl font-bold">Projects</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <article className="border rounded-lg overflow-hidden">
              <img src="/public/project-1.jpg" alt="project" className="w-full h-44 object-cover"/>
              <div className="p-4">
                <h4 className="font-semibold">Flight Booking App</h4>
                <p className="text-sm text-slate-600 mt-2">React • Node • MongoDB</p>
              </div>
            </article>
            <article className="border rounded-lg overflow-hidden">
              <img src="/public/project-2.jpg" alt="project" className="w-full h-44 object-cover"/>
              <div className="p-4">
                <h4 className="font-semibold">Portfolio Website</h4>
                <p className="text-sm text-slate-600 mt-2">Vite • React • Tailwind</p>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="mt-16">
          <h3 className="text-2xl font-bold">Contact</h3>
          <form className="mt-4 grid gap-3 max-w-xl">
            <input className="border rounded p-2" placeholder="Name" />
            <input className="border rounded p-2" placeholder="Email" />
            <textarea className="border rounded p-2" rows={4} placeholder="Message" />
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Or email: hello@example.com</div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
            </div>
          </form>
        </section>
      </main>
      <footer className="border-t py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-sm text-slate-500">© {new Date().getFullYear()} Shubham Gosai</div>
      </footer>
    </div>
  )
}
