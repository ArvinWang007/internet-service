import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the `/booking` path and the root path `/` to proceed without modification
  if (pathname === '/booking' || pathname === '/') {
    return NextResponse.next(); // Proceed without any changes
  }

  // You can add other allowed paths here if needed
  // e.g., if (pathname.startsWith('/allowed-path')) { return NextResponse.next(); }

  // If none of the conditions match, proceed without any modifications or redirects
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|terms|.*\\.(?:txt|xml|ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)).*)'
  ]
};