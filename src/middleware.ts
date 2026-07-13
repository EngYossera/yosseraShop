import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/pages/profile", "/pages/Cart", "/pages/wishlist", "/my-orders"];
const authRoutes = ["/pages/login", "/pages/Register"];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (matchesRoute(pathname, protectedRoutes) && !token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/pages/login";
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (matchesRoute(pathname, authRoutes) && token) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = callbackUrl?.startsWith("/") ? callbackUrl : "/";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/profile/:path*", "/pages/Cart/:path*", "/pages/wishlist/:path*", "/my-orders/:path*", "/pages/login", "/pages/Register"],
};
