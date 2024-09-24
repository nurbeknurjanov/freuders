'use client';
import { useTranslations } from 'next-intl';
import { useAppSelector } from 'store/hooks';
import { getAuthUser } from 'store/common/selectors';
import { useCallback, useState } from 'react';

type ModalType = { type: 'updateProfile' | 'changePassword' };

export function useProfile() {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');
  const tProfilePage = useTranslations('ProfilePage');
  const model = useAppSelector(getAuthUser);
  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

  return {
    tCommon,
    tUser,
    tProfilePage,
    model,
    showModal,
    setShowModal,
    closeShowModal,
  };
}
