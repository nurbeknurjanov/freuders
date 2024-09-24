import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './UserModalChangePassword';
import { notify } from 'store/common/thunks';
import { userChangePasswordThunk } from 'store/users/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';

export function useUserModalChangePassword({ onClose, id }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProfilePage = useTranslations('ProfilePage');
  const tUser = useTranslations('User');

  const userChangePasswordState = useAppSelector(
    users.userChangePassword.selector.state
  );

  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    password: Joi.string().min(6).label(tUser('password')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<Pick<IUserPost, 'password'>>({
    mode: 'onTouched',
    resolver: joiResolver(schema),
  });

  const updateUserPassword = async (
    id: string,
    formData: Pick<IUserPost, 'password'>
  ) => {
    const { data } = await dispatch(userChangePasswordThunk(id, formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
    }
  };

  const submitForm = (formData: Pick<IUserPost, 'password'>) => {
    updateUserPassword(id!, formData);
  };

  return {
    tCommon,
    tProfilePage,
    tUser,
    userChangePasswordState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
