import React from 'react';
import { ProductUpdate } from 'components/pages';
import type { PageProps } from 'app/types';

export interface ProductPageProps extends PageProps {
  params: PageProps['params'] & { id: string };
}

export default async function ProductPage({
  params: _params,
}: ProductPageProps) {
  return <ProductUpdate />;
}
