'use client';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';
import { useProductModel } from 'components/pages/Product';
import { useCallback, useState } from 'react';
import {
  useProductForm,
  useProductUploadFile,
} from 'components/pages/Products';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { IProductPost } from 'api/productsApi';
import { updateProductThunk } from 'store/products/thunks';
import { ignoreServerData, notify } from 'store/common/thunks';

type ModalType = { type: 'delete'; id: string };
export function useProductUpdate() {
  const dispatch = useAppDispatch();
  dispatch(ignoreServerData());
  const router = useRouter();
  const tCommon = useTranslations('Common');
  const tProduct = useTranslations('Product');
  const tProductPage = useTranslations('ProductPage');
  const tProductsPage = useTranslations('ProductsPage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const updateProductState = useAppSelector(
    products.updateProduct.selector.state
  );

  const { id } = useParams<ProductPageProps['params']>();
  const { model, getProductState } = useProductModel({ id });

  const {
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    schema,
    setValue,
    watch,
  } = useProductForm({
    model: model!,
  });

  const [selectedFileIdToDelete, setSelectedFileIdToDelete] = useState<
    string | null
  >();
  const afterFileUploadAndRemove = useCallback(() => {
    setSelectedFileIdToDelete(null);
  }, []);
  const { percentUploadImage, imageObject, deleteFile } = useProductUploadFile({
    id,
    setValue,
    watch,
    schema,
    afterFileUploadAndRemove,
  });

  const updateProduct = async (id: string, formData: IProductPost) => {
    const { data } = await dispatch(updateProductThunk(id, formData));

    if (data) {
      dispatch(notify(tCommon('successUpdated'), 'success'));

      if (document.referrer) {
        return router.back();
      }
      router.push(`/products/${model!._id}`);
    }
  };

  const submitForm = (formData: IProductPost) => {
    updateProduct(id!, formData);
  };

  return {
    id,
    tCommon,
    tProduct,
    tProductPage,
    tProductsPage,
    router,
    model,
    updateProductState,
    getProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    showModal,
    setShowModal,
    percentUploadImage,
    imageObject,
    deleteFile,
    selectedFileIdToDelete,
    setSelectedFileIdToDelete,
  };
}
