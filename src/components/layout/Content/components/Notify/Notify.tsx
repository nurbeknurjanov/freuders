'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { common } from 'store';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

export const Notify = () => {
  const dispatch = useAppDispatch();
  const { text, type } = useAppSelector(common.notify.selector.state);

  if (!text) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!text}
      autoHideDuration={3000}
      onClose={() => dispatch(common.notify.actions.reset())}
    >
      <Alert
        onClose={() => dispatch(common.notify.actions.reset())}
        icon={<CheckIcon fontSize="inherit" />}
        severity={type!}
        variant="filled"
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
