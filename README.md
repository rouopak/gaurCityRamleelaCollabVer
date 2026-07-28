<div align="center">

<img src="public/images/logo.png" alt="Shree Ram Leela Seva Trust Logo" width="120" height="120" />

# 🪔 Shree Ram Leela Seva Trust


**The official digital home of Shree Ram Leela Seva Trust — preserving culture, celebrating devotion.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)

---

</div>

## ✨ About the Project

**Shree Ram Leela Seva Trust** has been organizing the grand **Ramleela** celebration in Gaur City, Noida Extension for years, bringing together thousands of devotees every year. This website serves as the **official digital platform** for the trust — featuring:

- 📰 Live notices & press releases
- 🎭 Year-wise event galleries (2018–2025)
- 👥 Member directory with historical records
- 🛡️ Secure admin dashboard for content management
- 🏆 Achievement showcase

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19, Tailwind CSS v4, Framer Motion, GSAP |
| **3D / Graphics** | Three.js, React Three Fiber / Drei |
| **Auth** | NextAuth v5 (Auth.js) |
| **ORM** | Prisma v5 |
| **Database** | PostgreSQL via [Neon](https://neon.tech) |
| **Media CDN** | Cloudinary |
| **Email** | EmailJS |
| **Deployment** | Vercel (recommended) |

---

## 🎨 Features

### 🌐 Public Website
- **Animated Hero Section** — GSAP scroll-triggered animations with 3D elements via Three.js
- **Notice Board** — Dynamic lazy-loading of notices with scrollable title panel
- **Event Galleries** — Year-wise photo galleries spanning 2018–2025 with day-wise categorization
- **Members Page** — Paginated directory of trust members (legacy + new via admin)
- **Press Releases** — Chronological press release archive
- **About & Achievements** — Trust history and landmark achievements
- **Responsive Design** — Fully mobile-optimized with device-specific animations

### 🛡️ Admin Dashboard
- Secure login via NextAuth
- Full CRUD for: Notices, Events, Members, Press Releases
- Cloudinary-powered image uploads (with single-image constraint per event)
- Auto-cleanup: Notice board capped at 8 entries (oldest auto-deleted)

---

## 📁 Project Structure

```
.
├── prisma/                  # Prisma schema & migrations
├── public/
│   └── images/              # Static assets (logos, member photos, event images)
├── src/
│   ├── app/
│   │   ├── (main)/          # Public-facing pages
│   │   ├── admin/           # Admin dashboard (protected routes)
│   │   ├── actions/         # Server Actions (CRUD operations)
│   │   └── api/             # API routes
│   ├── components/          # Reusable UI components
│   ├── sections/            # Page sections (Hero, NoticeBoard, Footer, etc.)
│   ├── lib/                 # Prisma client, utilities
│   ├── data/                # Static JSON data (members, events)
│   ├── constants/           # App-wide constants
│   └── auth.js              # NextAuth configuration
├── .env.local               # ← NOT committed (see Environment Variables)
├── next.config.mjs
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- A [Neon](https://neon.tech) PostgreSQL database
- A [Cloudinary](https://cloudinary.com) account
- An [EmailJS](https://www.emailjs.com) account (for contact forms)

### 1. Clone the repository

```bash
git clone https://github.com/PIXELoverHERE/ShreeRamLeelaTrust-Web.git
cd ShreeRamLeelaTrust-Web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
# ── Database (Neon PostgreSQL) ──────────────────────────────────────
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# ── NextAuth ────────────────────────────────────────────────────────
NEXTAUTH_SECRET="your-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"

# ── Cloudinary ──────────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# ── EmailJS ─────────────────────────────────────────────────────────
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your-service-id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your-template-id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your-public-key"
```

> ⚠️ **Never commit `.env.local` or any `.env.*` files.** They are listed in `.gitignore`.

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema (Overview)

The Prisma schema manages the following entities:

| Model | Description |
|---|---|
| `User` | Admin users with hashed passwords |
| `NoticeBoard` | Trust notices (max 8, auto-pruned) |
| `Event` | Annual Ramleela events with image |
| `Member` | Trust members (name, role, photo) |
| `PressRelease` | Press release entries |

---

## 🔐 Security

- All `.env*` files are **gitignored** and **must never be committed**
- Admin routes are protected via **NextAuth** session middleware
- Passwords stored using **bcrypt** hashing
- Database credentials are never exposed client-side
- Cloudinary upload signatures are generated server-side only

---

## 🌐 Deployment

This project is optimized for **[Vercel](https://vercel.com)**:

1. Connect your GitHub repo to Vercel
2. Add all environment variables in the Vercel dashboard
3. Deploy — Vercel auto-detects Next.js

```bash
# Production build (local test)
npm run build
npm run start
```

---

## 🤝 Contributing

This is the official repository for **Shree Ram Leela Seva Trust**. For contributions or inquiries, please reach out to the trust committee.

---

## 📜 License

All rights reserved © Shree Ram Leela Seva Trust, Gaur City, Noida Extension.

---

<div align="center">

</div>
