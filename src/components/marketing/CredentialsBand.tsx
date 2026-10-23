import React from 'react';
import { Box } from '@mui/material';
import AppText from '../ui/AppText';
import AppContainer from '../ui/AppContainer';
import { credentials } from '../../content/credentials';
import { fonts } from '../../theme/tokens';

// A navy strip of Tammy's credentials: gold headlines over a short line each.
// Side by side from md, stacked with rules between them on phones.
const CredentialsBand: React.FC = () => (
  <Box
    component="section"
    aria-label="Tammy's credentials"
    sx={[(theme) => theme.mixins.navySurface, { py: { xs: 5, md: 6 } }]}
  >
    <AppContainer>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {credentials.map(({ headline, detail }) => (
          <Box
            component="li"
            key={headline}
            sx={{
              textAlign: 'center',
              py: { xs: 2.5, md: 0.5 },
              px: { md: 3 },
              '& + &': {
                borderTop: { xs: 1, md: 0 },
                borderLeft: { md: 1 },
                borderColor: 'onNavy.divider',
              },
            }}
          >
            <AppText
              component="p"
              sx={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: '1.375rem', lineHeight: 1.25, color: 'brand.gold' }}
            >
              {headline}
            </AppText>
            <AppText variant="body1" sx={{ mt: 0.5 }}>
              {detail}
            </AppText>
          </Box>
        ))}
      </Box>
    </AppContainer>
  </Box>
);

export default CredentialsBand;
