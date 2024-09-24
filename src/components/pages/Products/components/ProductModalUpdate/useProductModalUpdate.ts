import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { useTranslations } from 'next-intl';
import { IProductPost } from 'api/productsApi';
import { IProps } from './ProductModalUpdate';
import { useProductForm, useProductUploadFile } from '../';
import { useProductModel } from 'components/pages/Product';
import { notify } from 'store/common/thunks';
import { updateProductThunk } from 'store/products/thunks';
import { getAggStates } from 'store/common/types';
import { useCallback, useState } from 'react';

export function useProductModalUpdate({ onClose, afterUpdate, id }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const tProduct = useTranslations('Product');

  const { model, getProductState } = useProductModel({ id });

  const updateProductState = useAppSelector(
    products.updateProduct.selector.state
  );
  const aggStates = getAggStates(updateProductState);

  const {
    register,
    setValue,
    watch,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    schema,
  } = useProductForm({
    model: model!,
  });

  const [selectedFileIdToDelete, setSelectedFileIdToDelete] = useState<
    string | null
  >();
  const afterFileUploadAndRemove = useCallback(() => {
    setSelectedFileIdToDelete(null);
    afterUpdate();
  }, [afterUpdate]);
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
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
      afterUpdate();
    }
  };

  const submitForm = (formData: IProductPost) => {
    updateProduct(id!, formData);
  };

  return {
    tCommon,
    tProductPage,
    tProduct,
    aggStates,
    getProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    percentUploadImage,
    imageObject,
    deleteFile,
    selectedFileIdToDelete,
    setSelectedFileIdToDelete,
  };
}
