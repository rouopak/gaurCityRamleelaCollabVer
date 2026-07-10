# Shree RamLeela Seva Trust - Frontend

This is a Next.js application built for the Shree RamLeela Seva Trust. 

## Recent Changes & Optimizations
- **Notice Board Improvements**:
  - Implemented dynamic lazy-loading for notice board descriptions/images on click to keep page loading light and fast.
  - Capped NoticeBoard database table entries to a maximum of 8 by auto-deleting the oldest entries.
  - Styled scrollable notice titles in the left column using the `Cinzel` font, matching the navbar.
- **Preloader and Navigation Fixes**:
  - Integrated the preloader into admin layouts and configured it to trigger when crossing boundaries between admin and home pages.
  - Reverted administrative home-bound links (logo and "View Site") back to standard anchor tags (`<a>`) to force full server layout reloads across the admin boundary.
- **Navbar & Sidebar Separation**: Fully decoupled the mobile sidebar from the desktop navbar. Created a standalone `SideBar` component that handles its own mobile viewport detection and overlay logic.
- **Hero Section Mobile Optimization**: Hid heavy graphical elements on mobile, disabled GSAP scaling animations on mobile, and centered hero texts.

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
