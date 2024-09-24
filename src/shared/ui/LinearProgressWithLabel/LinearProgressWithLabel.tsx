import React from 'react';
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';

export const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LinearProgress variant="determinate" sx={{ flexGrow: 1 }} {...props} />
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        props.value
      )}%`}</Typography>
    </Box>
  );
};
