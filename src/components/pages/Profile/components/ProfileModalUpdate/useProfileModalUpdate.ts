import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './ProfileModalUpdate';
import { useUserForm } from 'components/pages/Users';
import { notify } from 'store/common/thunks';
import { updateProfileThunk } from 'store/users/thunks';
import { getAggStates } from 'store/common/types';
import { getAuthUser } from 'store/common/selectors';

export function useProfileModalUpdate({ onClose }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProfilePage = useTranslations('ProfilePage');
  const tUser = useTranslations('User');

  const model = useAppSelector(getAuthUser);

  const updateUserState = useAppSelector(users.updateUser.selector.state);
  const aggStates = getAggStates(updateUserState);

  const { register, errors, isValid, isDirty, handleSubmit, watch, setValue } =
    useUserForm({
      model: model!,
    });

  const updateUser = async (formData: IUserPost) => {
    const { data } = await dispatch(updateProfileThunk(formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
    }
  };

  const submitForm = (formData: IUserPost) => {
    updateUser(formData);
  };

  return {
    tCommon,
    tProfilePage,
    tUser,
    aggStates,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    watch,
    setValue,
  };
}
