import { match as localeMatcher } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ["en", "fr", "es", "de", "zh", "ja", "ko", "pt", "ru", "ar"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: { [key: string]: string } = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key.toLowerCase()] = value));

  const negotiator = new Negotiator({ headers: negotiatorHeaders });
  const languages = negotiator.languages();

  // Debug: Log the extracted languages
  console.log("Extracted Languages: ", languages);

  const locale = localeMatcher(languages, locales, defaultLocale);

  // Debug: Log the matched locale
  console.log("Matched Locale: ", locale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Debug: Log the current pathname
  console.log("Current Pathname: ", pathname);

  // Corrected method name to startsWith
  const pathnameIsLocale = locales.some(locale => pathname.startsWith(`/${locale}`));
  if (pathnameIsLocale) {
    console.log("Pathname starts with locale, proceeding to next response");
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);

  // Debug: Log the redirect URL
  console.log("Redirect URL: ", redirectUrl.href);

  if (request.nextUrl.href === redirectUrl.href) {
    console.log("Request URL matches redirect URL, proceeding to next response");
    return NextResponse.next();
  }

  console.log("Redirecting to: ", redirectUrl.href);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};