import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './FileModalDelete';
import { deleteFileThunk } from 'store/files/thunks';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { files } from 'store';

export function useFileModalDelete({
  afterDelete,
  onClose,
}: Omit<IProps, 'id'>) {
  const tFilePage = useTranslations('FilePage');
  const tCommon = useTranslations('Common');
  const dispatch = useAppDispatch();
  const deleteFileState = useAppSelector(files.deleteFile.selector.state);

  const deleteFile = useCallback(
    async (id: string) => {
      const { error } = await dispatch(deleteFileThunk(id));

      if (!error) {
        onClose();
        dispatch(notify(tCommon('successDeleted'), 'success'));
        afterDelete();
      }
    },
    [onClose, afterDelete, dispatch, tCommon]
  );

  return {
    tFilePage,
    tCommon,
    deleteFile,
    deleteFileState,
  };
}
