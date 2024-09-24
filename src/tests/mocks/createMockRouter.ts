import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const createMockRouter = (
  router: Partial<AppRouterInstance> = {}
): AppRouterInstance => ({
  back: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  forward: jest.fn(() => Promise.resolve(true)),
  refresh: jest.fn(() => Promise.resolve(true)),

  /*reload: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),

  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,*/

  ...router,
});
