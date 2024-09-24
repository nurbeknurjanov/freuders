import React from 'react';
import { PropsWithChildren } from 'react';
import styles from './page.module.scss';

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};
