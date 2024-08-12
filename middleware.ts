import { NextRequest, NextResponse } from "next/server";
// import { locales } from "./lib/i18n"; // Comment out this import since we're not using multi-language support

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ensure the `/booking` path is not redirected
  if (pathname === '/booking') {
    return;
  }

  // Comment out the locale checking logic
  // const isExit = locales.some(
  //   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  // );

  // if (isExit) return;

  // Redirect all non-matching paths to the root `/`
  request.nextUrl.pathname = `/`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|terms|.*\\.(?:txt|xml|ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)).*)'
  ]
};