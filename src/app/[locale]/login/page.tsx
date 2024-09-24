import React from 'react';
import { Login } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { useTranslations } from 'next-intl';

//eslint-disable-next-line
export default function LoginPage(props: PageProps) {
  const tLoginPage = useTranslations('LoginPage');
  serverStore.dispatch(
    common.title.actions.set({ title: tLoginPage('title') })
  );

  return <Login />;
}
