# 🌐 Pedro Consales Margaronis — Portfolio

Personal portfolio website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Showcases my background, experiences, skills, and projects as a Full-Stack Software Engineer.

**Live:** https://pedroconsales.dev

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Animated terminal background (FaultyTerminal) with intro and social links |
| **About Me** | Brief bio, stack overview, and profile photo |
| **Timeline** | Work and education history with `react-vertical-timeline-component` |
| **Skill Overview** | Categorized tech stack cards (Frontend, Backend, Database, DevOps, Tools, Languages) |
| **Projects** | Project cards with tech badges, GitHub links, live demo links, and confidentiality status |

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Theme:** `next-themes` (light/dark/system)
- **Fonts:** Figtree + Geist Mono (Google Fonts)
- **Icons:** `react-icons`

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, ThemeProvider
│   └── page.tsx            # Page composition
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AboutMe.tsx
│   │   ├── TimeLine.tsx
│   │   ├── SkillOverview.tsx
│   │   └── Projects.tsx
│   ├── react-bits/
│   │   └── FaultyTerminal/ # Animated terminal background
│   ├── theme-provider/
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── FadeInSection.tsx   # Framer Motion scroll reveal wrapper
│   └── Header.tsx          # Fixed navbar with active section tracking
└── hooks/
    └── useActiveSection.tsx # IntersectionObserver-based active nav tracking
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

- **Responsive** — mobile-first layout, tested down to 375px
- **Dark / Light / System theme** — persisted via `next-themes`
- **Scroll-based active nav** — uses `IntersectionObserver` to highlight the current section in the header
- **Scroll reveal animations** — `FadeInSection` wrapper fades content in as it enters the viewport
- **iOS Safari viewport fix** — uses `100dvh` instead of `100vh` to account for the Safari address bar

---

## Contact

- **GitHub:** [github.com/Pedro-Consales](https://github.com/Pedro-Consales)
- **LinkedIn:** [linkedin.com/in/pedro-consales-922b3b325](https://www.linkedin.com/in/pedro-consales-922b3b325/)