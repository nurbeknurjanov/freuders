import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "ru"] as const;
export type localeType = (typeof locales)[number];
export const defaultLocale: localeType = "en";

export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/login": {
    en: "/login",
    ru: "/vhod",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = "as-needed";

export type AppPathnames = keyof typeof pathnames;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
