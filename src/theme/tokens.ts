// Direction C, "navy and gold": the raw design tokens. The MUI theme
// (theme/index.ts) is built from these; components reach colours through the
// theme (sx strings such as 'brand.navy' or 'surface.muted') and fonts through
// `fonts`, so no page hard-codes either.

export const brand = {
  /** Primary brand colour: header, navy sections, secondary buttons. */
  navy: '#1E3A5F',
  /** Footer background. */
  navyDeep: '#142B47',
  /** Text on gold. */
  ink: '#14273F',
  /**
   * The direct CTA's fill, plus small accents (rules, step circles, borders).
   * Fails contrast as text on light backgrounds: use goldText there.
   */
  gold: '#FDC40A',
  /** DirectCta's hover and pressed fill. */
  goldHover: '#F2B600',
  /** Gold-coloured text on light backgrounds at any size (eyebrows, small text). 4.78:1 on sand. */
  goldText: '#8A6100',
  /**
   * Brighter gold for large text and icons on light backgrounds only: headline
   * accent words (32px and up) and the service-area pin. 3.51:1 on sand clears
   * the 3:1 large-text minimum but not 4.5:1, so never use it for small text.
   */
  goldAccent: '#A67500',
  /** Decorative quote marks only. */
  quoteGold: '#E0A800',
  /** Default page background. */
  cream: '#FBFAF6',
  /** Alternate light section background. */
  sand: '#F2EEE3',
  cardBorder: '#E5E1D6',
  white: '#FFFFFF',
} as const;

/** The logo mark's gold gradient, left to right. */
export const logoGradient = ['#FF9020', brand.gold, '#FDE20B'] as const;

export const textOnLight = {
  strong: '#1F2937',
  body: '#374151',
  muted: '#4B5563',
} as const;

export const textOnNavy = {
  heading: '#FFFFFF',
  body: '#D5DEEA',
  nav: '#E6ECF4',
  divider: '#4A6487',
  /** The footer's copyright rule, on navyDeep. */
  footerRule: '#2E4767',
} as const;

export const fonts = {
  serif: '"Fraunces", Georgia, "Times New Roman", serif',
  // "Inter Fallback" (theme/fonts.css) is Arial sized to match Inter, so text doesn't reflow when Inter loads.
  sans: '"Inter", "Inter Fallback", "Roboto", "Helvetica", "Arial", sans-serif',
} as const;

/** Padding inside white cards, in theme spacing units: 36px, 28px on phones. */
export const cardPadding = { xs: 3.5, md: 4.5 } as const;

/**
 * Colours that depend on the surface behind them. Light surfaces get these by
 * default (on :root); navy surfaces redefine them, so headings, eyebrows,
 * accent words, outline buttons and focus rings switch to their on-navy
 * colours by themselves. Read through theme.palette.surface.
 */
export const surfaceVars = {
  light: {
    '--ll-heading': brand.navy,
    '--ll-body': textOnLight.body,
    '--ll-muted': textOnLight.muted,
    '--ll-eyebrow': brand.goldText,
    '--ll-accent': brand.goldAccent,
    '--ll-outline': brand.navy,
    '--ll-focus': brand.navy,
  },
  navy: {
    '--ll-heading': textOnNavy.heading,
    '--ll-body': textOnNavy.body,
    '--ll-muted': textOnNavy.body,
    '--ll-eyebrow': brand.gold,
    '--ll-accent': brand.gold,
    '--ll-outline': brand.white,
    '--ll-focus': brand.gold,
  },
} as const;
