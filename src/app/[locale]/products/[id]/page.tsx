import React from 'react';
import { Product } from 'components/pages';
import { serverStore } from 'store/store';
import type { PageProps } from 'app/types';
import { headers } from 'next/headers';
import { setServerWait, setTitle } from 'store/common/thunks';
import { getProductThunk } from 'store/products/thunks';
import { notFound } from 'next/navigation';

export interface ProductPageProps extends PageProps {
  params: PageProps['params'] & { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const headersList = headers();

  console.log("headersList.get('Referer')", headersList.get('Referer'));
  if (headersList.get('Referer') === null) {
    serverStore.dispatch(setServerWait(true));

    const { data: model } = await serverStore.dispatch(getProductThunk(id));
    if (!model) {
      serverStore.dispatch(setServerWait(false));
      return notFound();
    }

    serverStore.dispatch(setTitle(model!.name));

    serverStore.dispatch(setServerWait(false));
  }

  return <Product />;
}
