'use client';
import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IUserPost, IUser } from 'api/usersApi';
import { pick } from 'lodash';
import { useEffect, useMemo } from 'react';
import tlds from 'tlds';
import { useTranslations } from 'next-intl';
import { useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslatedData } from 'shared/hooks';

interface IProps {
  model?: IUser;
}
export function useUserForm({ model }: IProps) {
  const createUserState = useAppSelector(users.createUser.selector.state);
  const updateUserState = useAppSelector(users.updateUser.selector.state);
  const formUserState = model ? updateUserState : createUserState;
  const { sexOptions, statusOptions } = useTranslatedData();

  const tUser = useTranslations('User');
  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    name: Joi.string().label(tUser('name')),
    email: Joi.string()
      .label(tUser('email'))
      .email({
        minDomainSegments: 2,
        tlds: { allow: tlds },
      }),
    password: Joi.string().label(tUser('password')),
    age: Joi.number().label(tUser('age')),
    sex: Joi.number()
      .label(tUser('sex'))
      .valid(...Object.keys(sexOptions).map(el => Number(el))),
    status: Joi.number()
      .label(tUser('status'))
      .valid(...Object.keys(statusOptions).map(el => Number(el))),
  });

  const initialValues = useMemo<IUserPost>(() => {
    if (!model) {
      return {
        name: null,
        email: null,
        password: null,
        age: null,
        sex: null,
        status: null,
      };
    }

    return pick(model, ['name', 'email', 'password', 'age', 'sex', 'status']);
  }, [model]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
    setValue,
    setError,
  } = useForm<IUserPost>({
    mode: 'onTouched',
    resolver: joiResolver(schema),
    defaultValues: initialValues!,
  });

  useEffect(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  useEffect(() => {
    if (formUserState.error) {
      if (formUserState.error.data.fieldsErrors?.email) {
        setError('email', {
          type: '400',
          message: formUserState.error.data.fieldsErrors?.email,
        });
      }
    }
  }, [formUserState.error, setError]);

  return {
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    watch,
    setValue,
  };
}
