import React, { FC, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'css/globals.scss';
import { TranslationsProvider, ThemeRegistry } from 'shared/wrappers';
import { serverStore } from 'store/store';

const inter = Inter({ subsets: ['latin'] });

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: serverStore.getState().common.title.title || 'Next App',
    description:
      serverStore.getState().common.title.description || 'Next app description',
  };
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico?1" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="noindex" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

/*
Layout works only one time only on server
It doesn't react to ajax request
It reacts only to full request
The links in next are not native links
There are next ajaxed links
Thats why layout works only one time
And of course layout works only on server side, and never in client
Here happens hydration, the rendered html of layout, pasted to client
*/
const WrapperLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <TranslationsProvider>
      <ThemeRegistry>
        <RootLayout>{children}</RootLayout>
      </ThemeRegistry>
    </TranslationsProvider>
  );
};

export default WrapperLayout;
