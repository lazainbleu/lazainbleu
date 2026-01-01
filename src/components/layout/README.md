/\*\*

- Layout Components - Complete Module
-
- Ini adalah centralized layout system untuk Lazain Bleu Frontend.
- Semua layout components di-export dari file ini untuk clean imports.
-
- USAGE:
- ***
- import { Header, Footer, RootLayoutClient } from '@/components/layout'
- import { LAYOUT_Z_INDEX, HEADER_CONFIG } from '@/components/layout/config'
-
- COMPONENTS:
- ***
- - RootLayoutClient: Main layout wrapper (Header + Content + Footer)
- - Header: Fixed navigation with mobile menu trigger
- - Footer: Page footer with links, payment methods, socials
- - MobileMenu: Full-screen mobile navigation overlay
-
- CONFIGURATION:
- ***
- - config.ts: Centralized constants (z-index, spacing, timing, etc)
-
- DOCUMENTATION:
- ***
  export { default as Header } from './Header';
  export { default as Footer } from './Footer';
  export { MobileMenu } from './MobileMenu';
  export { RootLayoutClient } from './RootLayoutClient';

// Configuration & constants
export \* from './config';
