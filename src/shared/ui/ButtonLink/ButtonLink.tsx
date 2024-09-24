import React, { FC } from 'react';
import { Button } from '../Button';
import NextLink from 'next/link';
import { ButtonProps, LinkProps } from '@mui/material';

export const ButtonLink: FC<ButtonProps & LinkProps> = ({ href, ...props }) => {
  return <Button component={NextLink} href={href} {...props} />;
};
