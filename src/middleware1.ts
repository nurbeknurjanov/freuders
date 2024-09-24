import type { NextRequest, NextFetchEvent } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

async function _middleware(request: NextRequest, _event: NextFetchEvent) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  if (request.nextUrl.pathname.startsWith('/about')) {
    //return NextResponse.redirect(new URL("/contact", request.url));
    //return NextResponse.rewrite(new URL("/contact", request.url));
  }

  /*event.waitUntil(
    //new Promise((resolve) => setTimeout(resolve, 5000)), //not working
    fetch("https://my-analytics-platform.com", {
      method: "POST",
      body: JSON.stringify({ pathname: request.nextUrl.pathname }),
    }),
  );*/

  /*return Response.json(
    { code: "NOT_authentication", message: "authentication failed" },
    { status: 401 },
  );*/
  /*const response = NextResponse.next();
  response.cookies.set("vercel", "nurbek");
  return response;*/
}

// See "Matching Paths" below to learn more
export const config = {
  //matcher: "/about/:path*",
  matcher: [
    '/',
    '/(en|ru)/:path*',
    // Skip all internal paths (_next)
    //"/((?!_next).*)",
    // Optional: only run on root (/about) URL
    //"/about/:path*",
  ],
};
