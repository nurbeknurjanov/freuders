'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';
import { useEffect } from 'react';

export const Title = () => {
  const { title } = useAppSelector(common.title.selector.state);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  if (!title) {
    return null;
  }

  return (
    <Typography variant="h5" sx={{ my: 1, mt: '4px' }}>
      {title}
    </Typography>
  );
};
