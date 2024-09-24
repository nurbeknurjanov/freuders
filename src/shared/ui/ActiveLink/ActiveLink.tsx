import React, { forwardRef } from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
//import { usePathname } from "next/navigation";
import { usePathname } from 'navigation';
import { LinkProps as MuiLinkProps, Link as MuiLink } from '@mui/material';
import cn from 'classnames';
import styles from './activeLink.module.scss';
import { to } from 'shared/utils';

type Props = Omit<MuiLinkProps, 'href'> & NextLinkProps;

export const ActiveLink = forwardRef<HTMLAnchorElement, Props>(
  function LinkBehaviour({ href, className, ...props }, ref) {
    const pathName = usePathname();
    const hrefPathName = typeof href === 'string' ? href : href.pathname;
    const isActive = pathName === hrefPathName;

    return (
      <MuiLink
        href={typeof href === 'string' ? href : to(href)}
        className={cn(className, { [styles.isActive]: isActive })}
        {...props}
        ref={ref}
      />
    );
  }
);

ActiveLink.displayName = 'ActiveLink';
