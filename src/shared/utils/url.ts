import { LinkProps as NextLinkProps } from 'next/link';

export const to = (url: string | NextLinkProps['href']): string => {
  if (typeof url === 'string') {
    return url;
  }

  let stringUrl = url.pathname!;
  if (url.query) {
    const search = new URLSearchParams(
      url.query as Record<string, string>
    ).toString();
    stringUrl = stringUrl + `?` + search;
  }

  return stringUrl;
};
