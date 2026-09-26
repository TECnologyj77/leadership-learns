import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gold: { accent: string; text: string; hover: string; pressed: string };
  }
  interface PaletteOptions {
    gold?: Palette['gold'];
  }
}

// Accent gold works for fills, large text and icons. Use text gold on light
// surfaces only; it does not have sufficient contrast against the brand navy.
const gold = {
  accent: '#A77F20',
  text: '#745816',
  hover: '#AD8526',
  pressed: '#B58C2B',
};
const focusRing = {
  outline: '3px solid #1E3A5F',
  outlineOffset: 3,
  boxShadow: '0 0 0 3px #FFFFFF',
};
// Outlined and text secondary buttons sit on light surfaces, so they use text gold.
const goldTextButton = {
  color: gold.text,
  '&:hover': { backgroundColor: 'rgba(116, 88, 22, 0.06)' },
  '&:active': { backgroundColor: 'rgba(116, 88, 22, 0.12)' },
};

const theme = createTheme({
  palette: {
    gold,
    primary: {
      main: '#1E3A5F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: gold.accent,
      dark: gold.text,
      contrastText: '#1C1C1C',
    },
    background: {
      default: '#F7F8FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1C',
      secondary: '#5A5A5A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollPaddingTop: 'calc(var(--site-header-height, 64px) + 16px)' },
        body: { overflowWrap: 'anywhere' },
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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // Two bands remain distinguishable on light, navy and gold surfaces.
          '&.Mui-focusVisible': focusRing,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          borderRadius: 8,
          fontSize: '1rem',
          minHeight: 44, // comfortable touch target on mobile
          '&.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.26)',
            '&.MuiButton-contained': { backgroundColor: 'rgba(0, 0, 0, 0.12)' },
          },
          // MUI v9 no longer emits combined classes such as MuiButton-outlinedSecondary,
          // so match variant and color by props. These stay below the disabled rule's
          // specificity, so disabled buttons still render grey.
          variants: [
            {
              props: { variant: 'contained', color: 'secondary' },
              style: {
                color: '#1C1C1C',
                backgroundColor: gold.accent,
                '&:hover': { backgroundColor: gold.hover },
                '&:active': { backgroundColor: gold.pressed },
              },
            },
            {
              props: { variant: 'outlined', color: 'secondary' },
              style: { ...goldTextButton, borderColor: gold.text },
            },
            {
              props: { variant: 'text', color: 'secondary' },
              style: goldTextButton,
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

export default responsiveFontSizes(theme);
