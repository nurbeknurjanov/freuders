import React, { FC } from 'react';
import { default as MuiButton } from '@mui/material/Button';
import { ButtonProps as MuiButtonProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  //eslint-disable-next-line
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }

  //eslint-disable-next-line
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ loading, children, ...props }) => {
  const _theme = useTheme();
  let content = children;
  if (loading) {
    content = <CircularProgress color={'inherit'} size={'1.5rem'} />;
  }
  return <MuiButton {...props}>{content}</MuiButton>;
};
