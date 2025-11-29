import { NextResponse } from "next/server";

export function middleware(req) {
  const basketId = req.cookies.get("basketId")?.value;

  const protectedRoutes = ["/dashboard", "/perfil", "/panel"];

  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !basketId) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*", "/panel/:path*"],
};
