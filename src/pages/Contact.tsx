import React, { useState } from 'react';
import { Grid, Box, TextField, Paper } from '@mui/material';
import AppText from '../components/ui/AppText';
import AppSection from '../components/ui/AppSection';
import AppContainer from '../components/ui/AppContainer';
import AppButton from '../components/ui/AppButton';

const Contact: React.FC = () => {
  const [bookingType, setBookingType] = useState<'corporate' | 'individual'>('corporate');

  return (
    <>
      <AppSection variant="light">
        <AppContainer>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <AppText variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Let's Build Something Great.
            </AppText>
            <AppText variant="h5" color="text.secondary">
              Book a call with Tammy or send us a message to get started.
            </AppText>
          </Box>

          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                  <AppButton 
                    variant={bookingType === 'corporate' ? 'contained' : 'outlined'} 
                    onClick={() => setBookingType('corporate')}
                  >
                    Corporate Inquiry
                  </AppButton>
                  <AppButton 
                    variant={bookingType === 'individual' ? 'contained' : 'outlined'} 
                    color="secondary"
                    onClick={() => setBookingType('individual')}
                  >
                    Individual Coaching
                  </AppButton>
                </Box>
                
                {/* Embedded booking placeholder */}
                <Box 
                  sx={{ 
                    bgcolor: 'background.default', 
                    height: 500, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px dashed',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ textAlign: 'center', p: 4 }}>
                    <AppText variant="h6" gutterBottom>
                      {bookingType === 'corporate' ? 'Corporate Strategy Call' : 'Individual Clarity Call'}
                    </AppText>
                    <AppText variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Acuity Scheduling / Calendly Embed Placeholder
                    </AppText>
                    <AppButton variant="contained" disabled>Load Scheduler</AppButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <AppText variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                General Inquiry
              </AppText>
              <AppText variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Prefer to send an email first? Fill out the form below and we'll get back to you within 24 hours.
              </AppText>
              
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField label="Full Name" variant="outlined" fullWidth required />
                <TextField label="Email Address" type="email" variant="outlined" fullWidth required />
                <TextField label="Subject" variant="outlined" fullWidth />
                <TextField 
                  label="Message" 
                  variant="outlined" 
                  multiline 
                  rows={4} 
                  fullWidth 
                  required 
                />
                <AppButton variant="contained" color="primary" size="large" fullWidth>
                  Send Message
                </AppButton>
              </Box>

              <Box sx={{ mt: 6, p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 3 }}>
                <AppText variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Email Capture
                </AppText>
                <AppText variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Join 2,000+ leaders getting our weekly "System Sunday" newsletter.
                </AppText>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField 
                    placeholder="Your email" 
                    size="small" 
                    sx={{ bgcolor: 'white', borderRadius: 1 }} 
                    fullWidth 
                  />
                  <AppButton variant="contained" color="secondary">Join</AppButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </AppContainer>
      </AppSection>
    </>
  );
};

export default Contact;
