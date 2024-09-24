import type { localeType } from 'i18n';

export type PageProps = {
  params: { locale: localeType };
  searchParams: { [key: string]: string | string[] };
};
