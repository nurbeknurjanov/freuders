'use client';
import { useParams, useRouter } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from './useProductModel';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppSelector } from 'store/hooks';
import { getProductsPermissionsStateSelector } from 'store/products/selectors';

type ModalType = { type: 'delete'; id: string };
export function useProduct() {
  const tProductsPage = useTranslations('ProductsPage');
  const router = useRouter();

  const productsPermissions = useAppSelector(
    getProductsPermissionsStateSelector
  );

  const [showModal, setShowModal] = useState<ModalType | null>();

  const { id } = useParams<ProductPageProps['params']>();
  const { tCommon, tProduct, tProductPage, model, getProductState } =
    useProductModel({ id });

  return {
    tCommon,
    tProduct,
    tProductPage,
    tProductsPage,
    model,
    getProductState,
    showModal,
    setShowModal,
    router,
    productsPermissions,
  };
}
