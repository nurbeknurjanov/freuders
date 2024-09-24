'use client';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme } from '../ui/Theme';

export function ThemeRegistry({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
