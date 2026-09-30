# Axiyon Launch Portal: Cyber-Physical Interactive Launchpad

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Next.js 14](https://img.shields.io/badge/Next.js-14.x-black.svg)](https://nextjs.org/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-teal.svg)](https://tailwindcss.com/)
[![Animation: Framer Motion](https://img.shields.io/badge/Motion-Framer%20Motion-purple.svg)](https://www.framer.com/motion/)

**Axiyon Launch Portal** is an interactive, cyberpunk-inspired web application and deployment portal designed for high-density infrastructure telemetry, real-time node orchestration, and product reveals.

It features stateful puzzle decryption mechanics, live spatiotemporal pipeline simulators, reactive HUD interfaces, and smooth cryptographic micro-animations.

---

## 1. Features & Capabilities

- **Stateful Cryptographic HUD**: Real-time encrypted clock, dynamic terminal logs, and live frequency calibration simulators.
- **Interactive Spatial Pipeline**: Real-time visual pipeline nodes (`INGEST`, `TRANSFORM`, `PINN_CALC`, `BROADCAST`).
- **Reactive Decrypted Animations**: High-performance canvas text scrambling and particle click-sparks powered by Framer Motion.
- **Responsive Cyber-Physical Theme**: Custom phosphor-green and deep slate aesthetic optimized for command-center displays.

---

## 2. Directory Structure

```
launch-portal/
├── public/                 # Static assets, audio, and branding logos
├── src/
│   ├── app/                # Next.js 14 App Router pages
│   │   ├── about/          # Architectural overview & documentation
│   │   ├── layout.tsx      # Root application layout & font loader
│   │   └── page.tsx        # Interactive Launchpad command center
│   ├── components/         # Reusable tactical UI components
│   │   ├── animations/     # DecryptedText, ClickSpark canvas effects
│   │   └── ui/             # EncryptedClock, ConnectModal, TacticalNav
│   ├── context/            # React PuzzleContext & state management
│   └── lib/                # Utility helpers and cryptographic hashers
├── .env.example            # Environment template
├── tailwind.config.js      # Custom theme colors and glow utilities
└── package.json            # Next.js & UI dependencies
```

---

## 3. Quickstart & Installation

### Prerequisites
- Node.js >= 18.x
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abdullah00ashraf/launch-portal.git
   cd launch-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### Production Build

```bash
npm run build
npm run start
```

---

## 4. License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
