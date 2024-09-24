import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './ProductModalDelete';
import { deleteProductThunk } from 'store/products/thunks';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { products } from 'store';

export function useProductModalDelete({
  afterDelete,
  onClose,
}: Omit<IProps, 'id'>) {
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const dispatch = useAppDispatch();
  const deleteProductState = useAppSelector(
    products.deleteProduct.selector.state
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      const { error } = await dispatch(deleteProductThunk(id));

      if (!error) {
        onClose();
        dispatch(notify(tCommon('successDeleted'), 'success'));
        afterDelete();
      }
    },
    [onClose, afterDelete, dispatch, tCommon]
  );

  return {
    tCommon,
    tProductPage,
    deleteProduct,
    deleteProductState,
  };
}
