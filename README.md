# Shree RamLeela Seva Trust - Frontend

This is a Next.js application built for the Shree RamLeela Seva Trust. 

## Recent Changes & Optimizations (Mobile & UI Refactor)
- **Navbar & Sidebar Separation**: Fully decoupled the mobile sidebar from the desktop navbar. Created a standalone `SideBar` component that handles its own mobile viewport detection and overlay logic.
- **Conditional Rendering**: Implemented `isMobile` checks so the `Navbar` only renders on desktop and the `SideBar` only renders on mobile devices, ensuring a clean DOM.
- **Sidebar Typography & Design**: Removed inherited `.scrolled` styling to fix flexbox layout issues. Enhanced typography using the `Cinzel` font, uppercase formatting, wide letter spacing (`tracking-[0.15em]`), and added sleek micro-animations (`hover:scale-105`) for a premium feel.
- **Donation Modal Overlay**: Fixed the stacking context (z-index) in `donation/page.js` to `z-[999]` so the enlarged QR code modal properly covers the sticky navbar (`z-[100]`).
- **Hero Section Mobile Optimization**:
  - Hid heavy graphical elements (`main.png`, `Layer2.png`, and `Layer3.png`) on mobile screens to improve layout and performance.
  - Disabled the GSAP scroll-triggered scaling and translating animation for the Ramayan title logo specifically on mobile.
  - Vertically and horizontally centered the hero text content and logo on mobile devices for a more balanced and aesthetic presentation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
