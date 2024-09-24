'use client';
import React from 'react';
import styles from './content.module.scss';
import { Page, Title, Buttons, Breadcrumbs, Notify } from './components';
import { PropsWithChildren } from 'react';

export function Content({ children }: PropsWithChildren) {
  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <Breadcrumbs />
        <Buttons />
      </div>

      <div className={styles.center}>
        <Notify />
        <Title />
        <Page>{children}</Page>
      </div>
    </section>
  );
}
