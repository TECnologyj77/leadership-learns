import React from 'react';
import { Grid, Box } from '@mui/material';
import AppText from '../ui/AppText';

export interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  color?: 'primary' | 'secondary';
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps, color = 'primary' }) => {
  return (
    <Grid container spacing={4} component="ol" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {steps.map((step, index) => (
        <Grid size={{ xs: 12, md: 4 }} component="li" key={step.title}>
          <Box sx={{ textAlign: 'center' }}>
            <Box
              aria-hidden="true"
              sx={{
                width: 56,
                height: 56,
                mx: 'auto',
                mb: 2,
                borderRadius: '50%',
                bgcolor: `${color}.main`,
                color: `${color}.contrastText`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AppText variant="h5" component="span" sx={{ fontWeight: 700 }}>
                {index + 1}
              </AppText>
            </Box>
            <AppText variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              {step.title}
            </AppText>
            <AppText variant="body2" color="text.secondary">
              {step.description}
            </AppText>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProcessSteps;
