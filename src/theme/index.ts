import { createTheme } from '@mui/material/styles';
import type { CSSProperties } from '@mui/material/styles';
import { brand, fonts, surfaceVars, textOnLight, textOnNavy } from './tokens';

type SurfaceColors = Record<'heading' | 'body' | 'muted' | 'eyebrow' | 'accent' | 'outline' | 'focus', string>;

declare module '@mui/material/styles' {
  interface Palette {
    brand: typeof brand;
    onNavy: typeof textOnNavy;
    /** Colours that follow the surface behind them (see surfaceVars in tokens.ts). */
    surface: SurfaceColors;
  }
  interface PaletteOptions {
    brand?: typeof brand;
    onNavy?: typeof textOnNavy;
    surface?: SurfaceColors;
  }
  interface TypeText {
    /** Running text on light backgrounds; primary is the strong shade, secondary the muted one. */
    body: string;
  }
  interface TypographyVariants {
    eyebrow: CSSProperties;
    lead: CSSProperties;
    statement: CSSProperties;
    quote: CSSProperties;
  }
  interface TypographyVariantsOptions {
    eyebrow?: CSSProperties;
    lead?: CSSProperties;
    statement?: CSSProperties;
    quote?: CSSProperties;
  }
  interface Mixins {
    /** Navy background, with headings, text, accents and focus rings switched to their on-navy colours. */
    navySurface: CSSProperties;
    /** Puts a light surface (such as a white card) back on the light-surface colours inside a navy one. */
    lightSurface: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    eyebrow: true;
    lead: true;
    statement: true;
    quote: true;
  }
}

const surface: SurfaceColors = {
  heading: 'var(--ll-heading)',
  body: 'var(--ll-body)',
  muted: 'var(--ll-muted)',
  eyebrow: 'var(--ll-eyebrow)',
  accent: 'var(--ll-accent)',
  outline: 'var(--ll-outline)',
  focus: 'var(--ll-focus)',
};

// One ring everywhere: navy on light surfaces, gold on navy ones.
const focusRing = {
  outline: `3px solid ${surface.focus}`,
  outlineOffset: 3,
};

const heading = {
  fontFamily: fonts.serif,
  fontWeight: 600,
  color: surface.heading,
};

const theme = createTheme({
  palette: {
    brand,
    onNavy: textOnNavy,
    surface,
    primary: {
      main: brand.navy,
      dark: brand.navyDeep,
      contrastText: brand.white,
    },
    // Accessible gold for icons and text on light surfaces. The gold fill
    // belongs to DirectCta alone, so no button uses this colour.
    secondary: {
      main: brand.goldText,
      contrastText: brand.white,
    },
    background: {
      default: brand.cream,
      paper: brand.white,
    },
    text: {
      primary: textOnLight.strong,
      secondary: textOnLight.muted,
      body: textOnLight.body,
    },
    divider: brand.cardBorder,
  },
  typography: {
    fontFamily: fonts.sans,
    h1: {
      ...heading,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      textWrap: 'balance',
    },
    h2: {
      ...heading,
      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
      textWrap: 'balance',
    },
    // Cards; step cards set their own 24px.
    h3: {
      ...heading,
      fontSize: '1.875rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      ...heading,
      fontSize: '1.5rem',
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.4 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.6 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
    lead: {
      fontFamily: fonts.sans,
      fontSize: '1.25rem',
      lineHeight: 1.55,
    },
    eyebrow: {
      fontFamily: fonts.sans,
      fontSize: '0.8125rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '0.13em',
      textTransform: 'uppercase',
      color: surface.eyebrow,
    },
    // A section's closing line, e.g. the problem section's "You deserve…".
    statement: {
      fontFamily: fonts.serif,
      fontStyle: 'italic',
      fontWeight: 500,
      fontSize: '1.3125rem',
      lineHeight: 1.4,
      color: surface.heading,
    },
    // Testimonial quotes, always on a white card.
    quote: {
      fontFamily: fonts.serif,
      fontStyle: 'italic',
      fontWeight: 500,
      fontSize: '1.1875rem',
      lineHeight: 1.5,
      color: brand.navy,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  mixins: {
    navySurface: {
      ...surfaceVars.navy,
      backgroundColor: brand.navy,
      color: surface.body,
    },
    lightSurface: {
      ...surfaceVars.light,
      color: surface.body,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': surfaceVars.light,
        html: {
          scrollPaddingTop: 'calc(var(--site-header-height, 64px) + 16px)',
          // Room for the phone action bar (PhoneActionBar), which is gone from sm up.
          scrollPaddingBottom: 'calc(76px + env(safe-area-inset-bottom))',
          '@media (min-width: 600px)': { scrollPaddingBottom: 0 },
        },
        body: { overflowWrap: 'anywhere', color: surface.body },
        ':where(a, button, video, summary, [tabindex]):focus-visible': focusRing,
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: { eyebrow: 'p', lead: 'p', statement: 'p', quote: 'p' },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: { paddingLeft: 24, paddingRight: 24 },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': focusRing,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '10px 22px',
          borderRadius: 10,
          fontSize: '1rem',
          lineHeight: 1.4,
          minHeight: 44, // comfortable touch target on mobile
          '&.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.26)',
            '&.MuiButton-contained': { backgroundColor: 'rgba(0, 0, 0, 0.12)' },
          },
          // MUI v9 no longer emits combined classes such as MuiButton-outlinedPrimary,
          // so match variant and color by props. These stay below the disabled rule's
          // specificity, so disabled buttons still render grey.
          variants: [
            {
              props: { size: 'large' },
              style: { minHeight: 52, padding: '12px 26px' },
            },
            {
              props: { variant: 'contained', color: 'primary' },
              style: { '&:hover': { backgroundColor: brand.navyDeep } },
            },
            // Navy outline on light surfaces, white outline on navy ones.
            {
              props: { variant: 'outlined', color: 'primary' },
              style: {
                color: surface.outline,
                border: `1.5px solid ${surface.outline}`,
                '&:hover': {
                  border: `1.5px solid ${surface.outline}`,
                  backgroundColor: `color-mix(in srgb, ${surface.outline} 8%, transparent)`,
                },
              },
            },
          ],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
