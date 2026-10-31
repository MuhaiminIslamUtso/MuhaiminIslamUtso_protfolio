# UTSO – Developer Portfolio & Mini-Game Arcade

A modern developer portfolio website designed and developed for **Muhaimin Islam Utso (UTSO)** — Computer Science and Engineering student at American International University-Bangladesh (AIUB) and aspiring full-stack developer.

Featuring a terminal-inspired developer aesthetic, verified project showcases, interactive skill matrices, and a built-in retro mini-game arcade.

---

## 🌟 Overview & Key Features

- **Developer Terminal Theme**: Refined monospace accents, dark backgrounds (`#09090D`, `#111118`, `#171720`), and purple neon highlights (`#8B5CF6`, `#A78BFA`).
- **Complete Multi-Page Architecture**:
  - `/` — Homepage with terminal hero, animated intro, project previews, skills highlights, and arcade showcase.
  - `/about` — Detailed developer journey, technical interests, learning direction, and goals.
  - `/skills` — Categorized skills with custom icons, clean cards, and no fabricated percentages.
  - `/projects` — Searchable and filterable project catalog (by technology and project status).
  - `/projects/:slug` — Deep-dive project details with objectives, features, technical challenges, and learning outcomes.
  - `/education` — Confirmed AIUB academic background with honest placeholders.
  - `/experience` — Learning journey and practical software development timeline.
  - `/achievements` — Genuine milestone tracking with status updates.
  - `/resume` — Smart resume portal with automated availability detection and download fallbacks.
  - `/contact` — Accessible contact form with validation and formatted email client dispatch.
  - `/arcade` — Interactive game center featuring three mini-games.
  - `404` — Terminal-themed Not Found page.
- **Interactive Mini-Game Arcade**:
  - **Platform Adventure**: A 2D side-scrolling platformer with 3 levels (*Beginner Village*, *Skill Forest*, and *Project City*) powered by Phaser 3. Includes touch controls for mobile.
  - **Snake Classic**: Grid-based movement, variable difficulty speeds, suicide-lock protection, and local high-score tracking.
  - **Tech Memory Match**: Card-flipping memory game matching 8 technologies, 3 difficulty tiers, timer, move counter, and record tracking.
- **Data Persistence**: LocalStorage persistence for all game records, high scores, levels, and user preferences with error handling and fallback defaults.
- **Accessibility & Performance**: Semantic HTML5, keyboard navigation, focus indicators, and `prefers-reduced-motion` compliance.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.4.3 (App Router)
- **Frontend Library**: React 19.3.0 & React DOM
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 & PostCSS
- **Animations**: GSAP 3.15
- **Game Engine**: Phaser 3.90 (Platform Adventure)
- **Icons**: Lucide React & Custom Accessible SVGs
- **Deployment Target**: Vercel / Node.js

---

## 📂 Project Structure

```text
muhaiminislamutso/
├── app/
│   ├── layout.tsx                  # Root layout & SEO metadata
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # Design tokens & Tailwind styles
│   ├── not-found.tsx               # 404 handler
│   ├── about/page.tsx              # About page
│   ├── skills/page.tsx             # Skills catalog
│   ├── projects/
│   │   ├── page.tsx                # Filterable project catalog
│   │   └── [slug]/page.tsx         # Dynamic project detail page
│   ├── education/page.tsx          # Education details
│   ├── experience/page.tsx         # Learning journey timeline
│   ├── achievements/page.tsx       # Milestones
│   ├── resume/
│   │   ├── page.tsx                # Resume server wrapper
│   │   └── ResumeClient.tsx        # File availability detection & download
│   ├── contact/page.tsx            # Contact form & validation
│   ├── arcade/page.tsx             # Mini-game arcade hub
│   ├── components/
│   │   ├── common/                 # Buttons, Cards, Icons, TerminalWindow
│   │   ├── layout/                 # Navbar, Footer, MainLayout
│   │   └── sections/               # HeroSection, FeaturedProjects, etc.
│   ├── data/                       # Centralized, editable content files
│   │   ├── profile.ts              # Personal info, bio, goals
│   │   ├── projects.ts             # Project repository, tech stack, features
│   │   ├── skills.ts               # Categorized skill taxonomy
│   │   └── navigation.ts           # Navigation links
│   ├── games/
│   │   ├── adventure/              # Phaser 3 2D platformer
│   │   ├── snake/                  # Snake grid game
│   │   └── memory/                 # Memory card game
│   └── lib/
│       └── storage.ts              # LocalStorage wrapper & game persistence
├── public/
│   ├── resume/                     # Target folder for PDF resume
│   └── assets/                     # Icons & imagery
├── postcss.config.mjs              # Tailwind CSS v4 PostCSS configuration
├── next.config.ts                  # Next.js runtime configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18+ or v20+ (tested with v24.21)
- **npm**: v9+ (tested with v12.2)

### 1. Installation

Clone the repository and install dependencies:

```powershell
git clone https://github.com/MuhaiminIslamUtso/muhaiminislamutso.git
cd muhaiminislamutso
npm install
```

### 2. Local Development

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Verification

Run the full production compilation and TypeScript verification:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run start
```

### 4. Code Quality & Linting

Run ESLint checks:

```powershell
npm run lint
```

---

## 🎮 Mini-Game Controls

### 1. Platform Adventure (Phaser 3)
- **Desktop**:
  - `Left / Right Arrow`: Move horizontally
  - `Space` or `Up Arrow`: Jump
  - `P` or `Esc`: Pause / Resume
- **Mobile**:
  - Touch buttons for `Left`, `Right`, and `Jump`

### 2. Snake Classic
- **Desktop**:
  - `Arrow Keys` or `W`, `A`, `S`, `D`: Steer snake
  - `P` or `Esc`: Pause / Resume
- **Mobile**:
  - On-screen touch D-pad

### 3. Tech Memory Match
- **Desktop & Mobile**:
  - Click or tap to flip matching technology card pairs.
  - Three difficulty settings: Easy (4 pairs), Medium (6 pairs), Hard (8 pairs).

---

## ✏️ Customization Guide

### 1. Updating Profile & Bio
Edit `app/data/profile.ts`:
```ts
export const profile = {
  fullName: "Muhaimin Islam Utso",
  displayName: "UTSO",
  identity: "AIUB Student | Aspiring Full-Stack Developer",
  university: "American International University-Bangladesh (AIUB)",
  github: "https://github.com/MuhaiminIslamUtso",
  email: "your.email@example.com",
  bio: "...",
  // ...
};
```

### 2. Adding or Modifying Projects
Edit `app/data/projects.ts` to add items to the `projects` array:
```ts
{
  id: "4",
  slug: "my-new-project",
  title: "My New Project",
  shortDescription: "...",
  description: "...",
  category: "Web Application",
  status: "completed", // "academic" | "in-development" | "completed"
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  repositoryUrl: "https://github.com/...",
  features: ["Feature 1", "Feature 2"],
  challenges: ["Challenge 1"],
  learningOutcomes: ["Outcome 1"]
}
```

### 3. Adding Skills
Edit `app/data/skills.ts` to add skills to existing categories or define a new category:
```ts
{
  name: "Docker",
  description: "Containerization platform for applications",
  icon: "Doc"
}
```

### 4. Adding Your Resume PDF
Place your CV file directly at:
```text
public/resume/Muhaimin-Islam-Utso-CV.pdf
```
The `/resume` page detects the file and enables the "Open in New Tab" and "Download PDF" buttons.

### 5. Adding Another Game to Arcade
1. Create a component in `app/games/<your-game>/<YourGame>.tsx`.
2. Add a new tab button and view in `app/arcade/page.tsx`.
3. Use `GameStorage` in `app/lib/storage.ts` to persist your game's scores.

---

## 🌐 Deployment to Vercel

1. Push your repository to GitHub:
   ```powershell
   git add .
   git commit -m "Complete portfolio and arcade build"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import the `muhaiminislamutso` GitHub repository.
4. Next.js will be detected automatically. Leave default build settings (`npm run build`).
5. Click **Deploy**.

---

## 📄 License

This project is created for **Muhaimin Islam Utso**. All rights reserved.
