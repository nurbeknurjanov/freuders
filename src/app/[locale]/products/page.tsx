import React from 'react';
import { Products } from 'components/pages';
import { serverStore } from 'store/store';
import type { PageProps } from 'app/types';
import { getTranslations } from 'next-intl/server';
import { IPaginationRequest } from 'api/baseApi';
import { getProductsThunk } from 'store/products/thunks';
import { setServerWait, setTitle } from 'store/common/thunks';
import { IProductFilters, IProductSort } from 'api/productsApi';
import { GridSortModel } from '@mui/x-data-grid';
import { headers } from 'next/headers';

interface ProductsPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest & IProductFilters & IProductSort;
}
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const headersList = headers();

  const pagination = {
    pageNumber: searchParams.pageNumber ?? 0,
    pageSize: searchParams.pageSize ?? 12,
  };

  const filters: IProductFilters = {};
  ['name', 'description'].forEach(fieldName => {
    const value = searchParams[fieldName as keyof IProductFilters];
    if (value) {
      filters[fieldName as keyof IProductFilters] = value as any;
    }
  });

  let sorting = [] as GridSortModel;
  if (searchParams.sortField) {
    sorting = [
      {
        field: searchParams.sortField,
        sort: searchParams.sortDirection ?? 'asc',
      },
    ];
  }

  console.log("headersList.get('Referer')", headersList.get('Referer'));
  if (!headersList.get('Referer')) {
    serverStore.dispatch(setServerWait(true));

    const tProductsPage = await getTranslations('ProductsPage');
    serverStore.dispatch(setTitle(tProductsPage('title')));

    await serverStore.dispatch(getProductsThunk(pagination, filters, sorting));

    //console.log('data', serverStore.getState().products?.getProducts.data);

    serverStore.dispatch(setServerWait(false));
  }

  return <Products />;
}
