import React from 'react';
import { Container } from '@mui/material';
import type { ContainerProps } from '@mui/material';

const AppContainer: React.FC<ContainerProps> = ({ children, maxWidth = 'lg', ...props }) => {
  return (
    <Container maxWidth={maxWidth} {...props}>
      {children}
    </Container>
  );
};

export default AppContainer;
