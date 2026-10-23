import React from 'react';
import { Box } from '@mui/material';
import AppText from '../ui/AppText';
import AppSection from '../ui/AppSection';
import AppContainer from '../ui/AppContainer';
import CtaGroup from './CtaGroup';
import DirectCta from './DirectCta';
import SecondaryCta from './SecondaryCta';

interface ClosingCtaBandProps {
  /** Ends in an <Accent>. */
  title: React.ReactNode;
  subtitle: React.ReactNode;
  /** Analytics prefix for the buttons, e.g. 'home_final'. */
  ctaId: string;
  /** Further buttons after the two CTAs, e.g. "Read the Blog" (white outline on the band). */
  extraActions?: React.ReactNode;
  /** A line under the buttons, e.g. the service area. */
  note?: React.ReactNode;
}

// The page's last word: a rounded navy block with a gold bottom edge. It sits
// on the cream page right after a cream section, whose own padding spaces it.
const ClosingCtaBand: React.FC<ClosingCtaBandProps> = ({ title, subtitle, ctaId, extraActions, note }) => (
  <AppSection tone="cream" sx={{ pt: 0 }}>
    <AppContainer>
      <Box
        sx={[
          (theme) => theme.mixins.navySurface,
          {
            borderRadius: 6,
            borderBottom: '6px solid',
            borderBottomColor: 'brand.gold',
            px: { xs: 3, sm: 6, md: 8 },
            py: { xs: 6, md: 9 },
            textAlign: 'center',
          },
        ]}
      >
        <AppText variant="h2" component="h2" sx={{ maxWidth: 760, mx: 'auto' }}>
          {title}
        </AppText>
        <AppText variant="body1" sx={{ mt: 2, mb: 4, mx: 'auto', maxWidth: 600, fontSize: '1.125rem' }}>
          {subtitle}
        </AppText>
        <CtaGroup align="center">
          <DirectCta id={ctaId} location="final_cta" />
          <SecondaryCta id={ctaId} location="final_cta" />
          {extraActions}
        </CtaGroup>
        {note && <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>{note}</Box>}
      </Box>
    </AppContainer>
  </AppSection>
);

export default ClosingCtaBand;
