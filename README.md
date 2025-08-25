# port
# Portfolio Website (React + TypeScript) — Single-file project bundle

This document contains a minimal, ready-to-run portfolio web app built with React + TypeScript and a Firebase Firestore backend for the "Contact Me" form. Follow the README below to set up locally.

---

README.md

```
# Portfolio - React + TypeScript + Firebase (Contact DB)

## Overview
A small portfolio site with Home, Projects, About sections and a Contact form that stores submissions to Firebase Firestore.

## Features
- React + TypeScript + Vite
- Firestore (save contact messages to `contacts` collection)
- Simple responsive layout (CSS)
- Validations on contact form

## Setup
1. Install Node (>=18) and npm/yarn.
2. Create a Firebase project at https://console.firebase.google.com/ and enable Firestore.
3. Create a Web App inside your Firebase project and copy the configuration values.

## Local install
```bash
# clone or copy files into a folder
npm init vite@latest my-portfolio -- --template react-ts
cd my-portfolio
# replace src/* with the files in this repo
npm install
npm install firebase
npm run dev
```

## Environment
Create a `.env` file at the project root (Vite uses `VITE_` prefix):
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Deploy
You can deploy with Firebase Hosting or Vercel.

---
```

---

package.json

```
{
  "name": "portfolio-react-firebase",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "firebase": "^9.22.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
```

---

public/index.html

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

src/main.tsx

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

src/firebase.ts

```ts
// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig as any)
export const db = getFirestore(app)
```

---

src/components/ContactForm.tsx

```tsx
import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

type FormState = {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email.'
    if (!form.message.trim()) return 'Please enter a message.'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const v = validate()
    if (v) return setError(v)

    setLoading(true)
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: serverTimestamp(),
      })
      setSuccess('Message sent — thank you!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setError('Failed to send. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      <label>
        Message
        <textarea name="message" value={form.message} onChange={handleChange} rows={6} />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
      </div>

      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
    </form>
  )
}
```

---

src/App.tsx

```tsx
import React from 'react'
import ContactForm from './components/ContactForm'

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <h1>Hi — I&apos;m Shubham</h1>
          <p>Frontend Developer • React • TypeScript</p>
        </div>
      </header>

      <main className="container">
        <section id="about" className="card">
          <h2>About</h2>
          <p>I build fast, accessible web apps. This is a small portfolio demo.</p>
        </section>

        <section id="projects" className="card">
          <h2>Projects</h2>
          <ul>
            <li><strong>Project A</strong> — Short description.</li>
            <li><strong>Project B</strong> — Short description.</li>
          </ul>
        </section>

        <section id="contact" className="card">
          <h2>Contact</h2>
          <p>Use the form below — submissions go to Firebase Firestore.</p>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Shubham — Built with React + Firebase</div>
      </footer>
    </div>
  )
}
```

---

src/index.css

```css
:root{
  --max-width: 900px;
  --muted: #666;
}
*{box-sizing:border-box}
body{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; color:#111}
.container{max-width:var(--max-width);margin:0 auto;padding:24px}
.hero{background:linear-gradient(180deg,#f7f8fb,#fff);padding:48px 0;border-bottom:1px solid #eee}
.hero h1{margin:0;font-size:2.2rem}
.card{background:#fff;padding:20px;border-radius:10px;box-shadow:0 6px 18px rgba(17,17,17,0.04);margin-top:18px}
.contact-form label{display:block;margin-bottom:12px}
.contact-form input,.contact-form textarea{width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;margin-top:6px}
.form-actions{margin-top:12px}
.form-error{color:#b00020;margin-top:8px}
.form-success{color:#0b7a2b;margin-top:8px}
button{background:#111;color:#fff;padding:10px 14px;border-radius:8px;border:0;cursor:pointer}
.footer{padding:18px 0;text-align:center;color:var(--muted);margin-top:28px}
@media(min-width:800px){
  .card{padding:28px}
}
```

---

Notes:
- This template uses Firestore `addDoc` to store each contact message in `contacts` collection.
- Make sure Firestore rules are configured for your use-case. For production, restrict write access or add a CAPTCHA before allowing writes.
- If you prefer Realtime Database instead, I can add that version.

---

# End of bundle  

create animated 
