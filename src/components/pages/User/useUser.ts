'use client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { UserPageProps } from 'app/[locale]/users/[id]/page';
import { useUserModel } from './useUserModel';

export function useUser() {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');
  const tUsersPage = useTranslations('UsersPage');
  const { id } = useParams<UserPageProps['params']>();
  const { model, getUserState } = useUserModel({ id });

  return {
    tCommon,
    tUser,
    tUsersPage,
    model,
    getUserState,
  };
}
