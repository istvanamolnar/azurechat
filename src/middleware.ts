import { NextResponse, type NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { getToken } from "next-auth/jwt";

const requireAuth: string[] = [
  "/chat",
  "/api",
  "/reporting",
  "/unauthorized",
  "/persona",
  "/prompt"
];
const requireAdmin: string[] = ["/data-source", "/reporting"];

export async function middleware(request: NextRequest) {
  // Apply i18nRouter middleware
  const i18nResponse = i18nRouter(request, i18nConfig);
  if (i18nResponse) {
    return i18nResponse;
  }

  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
    });

    //check not logged in
    if (!token) {
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }

    if (requireAdmin.some((path) => pathname.startsWith(path))) {
      //check if not authorized
      if (!token.isAdmin) {
        const url = new URL(`/unauthorized`, request.url);
        return NextResponse.rewrite(url);
      }
    }
  }

  return res;
}

// note that middleware is not applied to api/auth as this is required to logon (i.e. requires anon access)
export const config = {
  matcher: [
    "/unauthorized/:path*",
    "/reporting/:path*",
    "/data-source/:path*",
    "/api/chat:path*",
    "/api/images:path*",
    "/chat/:path*",
    '/((?!api|static|.*\\..*|_next).*)'
  ],
};
