# SICODER Portfolio — React + TypeScript + Tailwind + Vite

Migrasi penuh dari HTML/CSS/JS vanilla ke React + TypeScript + Tailwind CSS + Vite.

## Struktur File

```
sicoder-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── LoadingScreen.tsx       # Loading screen saat pertama kali load
│   │   ├── CustomCursor.tsx        # Custom cursor dengan trail effect
│   │   ├── FloatingParticles.tsx   # Partikel floating background
│   │   ├── Header.tsx              # Navbar dengan mobile hamburger menu
│   │   ├── HeroSection.tsx         # Section hero dengan typing animation
│   │   ├── AboutSection.tsx        # Section about dengan stats counter
│   │   ├── SkillsSection.tsx       # Skills dengan filter tab & progress bar
│   │   ├── BlogSection.tsx         # Blog carousel dengan auto-slide
│   │   ├── ProjectsSection.tsx     # Projects dengan filter kategori
│   │   ├── ContactSection.tsx      # Contact form dengan validasi
│   │   ├── Footer.tsx              # Footer lengkap
│   │   ├── BackToTop.tsx           # Tombol back to top
│   │   └── ToastContainer.tsx      # Notifikasi toast
│   ├── data/
│   │   └── index.ts                # Data skills, blogPosts, projects
│   ├── hooks/
│   │   ├── useTheme.ts             # Dark/light theme switcher
│   │   ├── useScrollReveal.ts      # Scroll reveal animations
│   │   └── useToast.ts             # Toast notification state
│   ├── styles/
│   │   └── global.css              # Semua CSS original (variabel, animasi, komponen)
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Root component
│   └── main.tsx                    # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Setup & Menjalankan

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## Catatan Penting

1. **Assets**: Letakkan semua folder `assets/` dari project lama ke dalam `public/assets/`
2. **Gambar**: `logo-html-more-red-no-bg.png`, `Syifa-Anime.png`, `sicoder-logo.png`, dll
3. **CV Files**: `assets/CV/CV-FrontEnd-Ind.pdf` & `assets/CV/CV-FrontEnd-Eng.pdf`

## Fitur yang Dimigrasikan

- ✅ Loading Screen
- ✅ Custom Cursor + Trail
- ✅ Floating Particles Background
- ✅ Dark/Light Theme Toggle (Alt+T shortcut)
- ✅ Sticky Header + Scroll Effect
- ✅ Mobile Hamburger Menu
- ✅ Active Nav Highlight
- ✅ Hero Section + Typing Animation
- ✅ CV Dropdown
- ✅ About Section + Animated Counters
- ✅ Skills Section + Filter Tabs + Progress Bar Animation
- ✅ Blog Carousel + Auto-Slide + Keyboard Nav
- ✅ Projects Section + Category Filter
- ✅ Contact Form + Validation + Toast Notifications
- ✅ Footer + Newsletter Form
- ✅ Back to Top Button
- ✅ Scroll Reveal Animations
- ✅ Semua CSS Variables & Keyframe Animations Original
- ✅ Responsive Design (semua breakpoint)
