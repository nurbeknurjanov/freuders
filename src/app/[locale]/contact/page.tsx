import React from 'react';
import { Contact } from 'components/pages';
import { serverStore } from 'store/store';
import { common } from 'store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';
//import { Metadata } from "next";

/*export const metadata: Metadata = {
  title: "Contact",
  description: "Contact",
};*/

//eslint-disable-next-line
export default async function ContactPage(props: PageProps) {
  const tContactPage = await getTranslations('ContactPage');

  serverStore.dispatch(
    common.title.actions.set({ title: tContactPage('title') })
  );
  return <Contact />;
}
