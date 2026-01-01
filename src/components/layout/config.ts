/**
 * Layout Configuration & Types
 *
 * Centralized configuration untuk layout components
 * untuk memudahkan maintenance dan konsistensi di seluruh aplikasi
 */

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================
export const LAYOUT_Z_INDEX = {
  // Background layers
  BACKGROUND: 0,
  DEFAULT: 10,

  // Dropdown & popover
  DROPDOWN: 40,

  // Modals & overlays
  MODAL: 50,

  // Navigation
  HEADER: 50,
  MOBILE_MENU: 70,

  // Top-level
  NOTIFICATION: 80,
  TOOLTIP: 90,
} as const

// ============================================================================
// HEADER CONFIG
// ============================================================================
export const HEADER_CONFIG = {
  // Breakpoints untuk responsive behavior
  SCROLL_THRESHOLD: 20,

  // Padding & spacing
  PADDING_DESKTOP: { py: 6, px: 8 },
  PADDING_MOBILE: { py: 4, px: 4 },
  PADDING_SCROLLED: { py: 3, px: 8 },

  // Positioning
  FIXED_TOP: true,
  TRANSITION_DURATION: 700, // ms
  BLUR_EFFECT: 'backdrop-blur-md',
} as const

// ============================================================================
// FOOTER CONFIG
// ============================================================================
export const FOOTER_CONFIG = {
  // Padding & spacing
  PADDING_TOP: 80, // pt-20 (20 * 4px = 80px)
  PADDING_BOTTOM: 40, // pb-10

  // Colors
  BORDER_COLOR: '#0A192F',
  BORDER_OPACITY: 0.05,

  // Grid
  COLUMNS: {
    DESKTOP: 3,
    TABLET: 2,
    MOBILE: 1,
  },
} as const

// ============================================================================
// MOBILE MENU CONFIG
// ============================================================================
export const MOBILE_MENU_CONFIG = {
  // Z-Index
  Z_INDEX: LAYOUT_Z_INDEX.MOBILE_MENU,
  Z_INDEX_CLOSE_BTN: LAYOUT_Z_INDEX.MOBILE_MENU + 10,
  Z_INDEX_CONTENT: LAYOUT_Z_INDEX.MOBILE_MENU + 5,

  // Animations
  TRANSITION_DURATION: 500, // ms
  TRANSITION_TIMING: 'cubic-bezier(0.16,1,0.3,1)',
  STAGGER_DELAY: 50, // ms per item

  // Content offset
  CONTENT_OFFSET_Y: -64, // -mt-16
} as const

// ============================================================================
// ROOT LAYOUT CLIENT CONFIG
// ============================================================================
export const ROOT_LAYOUT_CONFIG = {
  // Main content padding (must match header height)
  MAIN_PADDING_TOP: 80, // pt-20

  // Minimum height untuk main content
  MIN_HEIGHT_VIEWPORT: '100vh',
} as const

// ============================================================================
// RESPONSIVE BREAKPOINTS (dari Tailwind)
// ============================================================================
export const BREAKPOINTS = {
  SM: 640, // small phones
  MD: 768, // tablets & larger phones
  LG: 1024, // desktops
  XL: 1280, // large desktops
  '2XL': 1536, // ultra-wide
} as const

// ============================================================================
// ANIMATION PRESETS
// ============================================================================
export const ANIMATION_PRESETS = {
  SMOOTH: {
    duration: 300,
    easing: 'ease-in-out',
  },
  TRANSITION: {
    duration: 500,
    easing: 'ease-in-out',
  },
  ENTRANCE: {
    duration: 700,
    easing: 'ease-out',
  },
} as const
