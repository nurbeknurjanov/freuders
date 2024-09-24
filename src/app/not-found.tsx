import React from 'react';
import { useTranslations } from 'next-intl';

//async можно
export default function NotFoundPage() {
  const tNotFoundPage = useTranslations('NotFoundPage');
  return <>{tNotFoundPage('title')}</>;
}
