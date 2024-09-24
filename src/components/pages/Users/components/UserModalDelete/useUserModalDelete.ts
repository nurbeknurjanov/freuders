import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './UserModalDelete';
import { deleteUserThunk } from 'store/users/thunks';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { users } from 'store';

export function useUserModalDelete({
  afterDelete,
  onClose,
}: Omit<IProps, 'id'>) {
  const tCommon = useTranslations('Common');
  const tUserPage = useTranslations('UserPage');
  const dispatch = useAppDispatch();
  const deleteUserState = useAppSelector(users.deleteUser.selector.state);

  const deleteUser = useCallback(
    async (id: string) => {
      const { error } = await dispatch(deleteUserThunk(id));

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
    tUserPage,
    deleteUser,
    deleteUserState,
  };
}
