'use client';
import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Checkbox } from 'shared/ui';

export function ExampleUi() {
  return (
    <>
      <Box
        component={'span'}
        sx={{ color: 'secondary.main', my: '20px' }}
        color={'secondary.main'}
      >
        Box
      </Box>
      <br />
      <Button variant={'contained'} color={'tertiary'}>
        Tertiary
      </Button>
      <Button variant={'dashed'}>Dashed</Button>
      <Button variant={'dashed'} color={'secondary'}>
        Dashed Secondary
      </Button>

      <Checkbox color={'tertiary'} checked />
      <br />
      <TextField label="Standard" variant="standard" color={'tertiary'} />
      <br />
    </>
  );
}
