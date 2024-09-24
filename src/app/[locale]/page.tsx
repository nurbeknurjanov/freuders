import React from 'react';
import { Home } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';

//eslint-disable-next-line
export default async function HomePage(props: PageProps) {
  //console.log("json data", (await import(`../../messages/ru.json`)).default);
  const tHomePage = await getTranslations('HomePage');

  async function someFetch() {
    'use server';
  }

  someFetch();

  serverStore.dispatch(common.title.actions.set({ title: tHomePage('title') }));
  return <Home />;
}
