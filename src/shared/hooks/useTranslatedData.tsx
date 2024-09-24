'use client';
import { statusOptions, STATUS_ENUM } from 'api/usersApi';
import { sexOptions, SEX_ENUM } from 'api/psychologistsApi';
import { useTranslations } from 'next-intl';

export function useTranslatedData() {
  const tUser = useTranslations('User');

  sexOptions[SEX_ENUM.MALE] = tUser('sexOptions.male');
  sexOptions[SEX_ENUM.FEMALE] = tUser('sexOptions.female');

  statusOptions[STATUS_ENUM.ENABLED] = tUser('statusOptions.enabled');
  statusOptions[STATUS_ENUM.DISABLED] = tUser('statusOptions.disabled');

  return {
    sexOptions,
    statusOptions,
  };
}
