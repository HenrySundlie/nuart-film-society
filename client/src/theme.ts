export const theme = {
  colors: {
    secondary: '#BDBDBD',
    accent: '#6366F1', // focus rings, CTAs
    link: '#C7D2FE', // link text
    nuartBlue: '#4357AD', // NuArt brand blue color
    // Slightly lighter default background for the whole site
    background: '#1C1C1C',
    surface: '#282828',
    // Extra-deep surface for controls like menu icon and mobile action card
    surfaceDeep: '#0B0B0B',
    highlight: '#3C3C3C',
    text: {
      primary: '#F5F5F5',
      secondary: '#C0C0C0',
      light: '#888888',
    },
    border: '#444444',
  },
  breakpoints: {
    mobile: '@media (max-width: 768px)',
    desktop: '@media (min-width: 768px)',
  },
  radii: {
    sm: '12px',
    md: '16px',
    lg: '20px',
    pill: '999px',
  },
  shadows: {
    card: '0 8px 30px rgba(0, 0, 0, 0.18)',
    focus: '0 0 0 2px rgba(99, 102, 241, 0.8)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: "'Cormorant Garamond', serif",
    h1: {
      // Increased sizes so H1 can be larger globally without local hard-coding
      fontSize: '3rem',
      fontWeight: 600,
      mobile: { fontSize: '2.4rem' },
    },
    h2: {
      fontSize: '2rem',
      mobile: { fontSize: '1.75rem' },
    },
    body: {
      // Mobile default body size ~16px for comfortable reading
      mobile: { fontSize: '16px' },
    },
  },
  transitions: {
    default: '0.2s ease-in-out',
  },
  surfaces: {
    // Reusable overlays to layer on top of a base surface color
    elevatedOverlay:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
  },
  textStyles: {
    gradientPrimary:
      'linear-gradient(180deg, var(--fg1, #F5F5F5), var(--fg2, #C0C0C0))',
  },
  // Layout tokens for consistent page paddings across screens
  layout: {
    contentPadding: {
      // Mobile paddings (more generous horizontal spacing)
      mobile: {
        x: 'clamp(16px, 5vw, 28px)', // keep text away from edges
        y: '24px',
      },
    },
  },
} as const;
