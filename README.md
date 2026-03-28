# 🚀 Portfolio v2 — Krishna Adiveppa Kalasannaavara

A modern, animated personal portfolio built with **React + Vite** (frontend) and **Node.js + Express** (backend).

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌌 Particle Network | Animated canvas particle background in hero |
| ✍ Typed Text | Auto-cycling role titles |
| 🖱 Custom Cursor | Glowing dot cursor with lagging ring follower |
| 📜 Scroll Reveals | Framer Motion entrance animations |
| 💎 Glassmorphism | Blur-backed cards with neon border highlights |
| 🌊 Smooth Scroll | Lenis buttery smooth scrolling |
| 🌙 Dark/Light Mode | One-click theme switch |
| 🔢 Counter Animation | Animated number stats in About |
| 📊 Scroll Progress | Progress bar at top of page |
| 📬 Contact Form | Sends to Node.js API + mailto fallback |

---

## 🛠 Tech Stack

```
Frontend:  React 18 · Vite · Framer Motion · React Icons · Lenis
Backend:   Node.js · Express · CORS
Fonts:     Space Grotesk · Syne (Google Fonts)
```

---

## 📁 Project Structure

```
Portfolio-v2/
├── client/                  ← React + Vite frontend
│   ├── public/
│   │   └── profile.jpg      ← Add your photo here!
│   └── src/
│       ├── components/      ← Cursor, Navbar, Footer
│       ├── sections/        ← Hero, About, Skills, Experience,
│       │                       Projects, Certifications, Education, Contact
│       ├── styles/globals.css
│       └── App.jsx
└── server/
    └── server.js            ← Express API (port 4000)
```

---

## 🚀 Getting Started

```bash
# Frontend
cd client && npm install && npm run dev
# → http://localhost:5173

# Backend
cd server && npm install && node server.js
# → http://localhost:4000
```

> 💡 Add your profile photo as `client/public/profile.jpg`

---

## 📬 Contact API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Receive contact form messages |
| `GET` | `/api/messages` | View all received messages |

---

## 👤 Developer

**Krishna Adiveppa Kalasannaavara** — B.E. CS & Business Systems, SIT Mangalore  
🔗 [LinkedIn](https://www.linkedin.com/in/krishna-a-k) · 🐙 [GitHub](https://github.com/Krishnaaka) · 🏅 [Credly](https://www.credly.com/users/krishna-a-k)
