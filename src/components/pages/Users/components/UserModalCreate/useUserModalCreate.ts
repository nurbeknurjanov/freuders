import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './UserModalCreate';
import { useUserForm } from '../useUserForm';
import { notify } from 'store/common/thunks';
import { createUserThunk } from 'store/users/thunks';

export function useUserModalCreate({ onClose, afterCreate }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tUsersPage = useTranslations('UsersPage');
  const tUser = useTranslations('User');

  const createUserState = useAppSelector(users.createUser.selector.state);

  const { register, errors, isValid, isDirty, handleSubmit, watch, setValue } =
    useUserForm({});

  const createUser = async (formData: IUserPost) => {
    const { data } = await dispatch(createUserThunk(formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successCreated'), 'success'));
      afterCreate();
    }
  };

  const submitForm = createUser;

  return {
    tCommon,
    tUsersPage,
    tUser,
    createUserState,
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
