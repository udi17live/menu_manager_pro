import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const pathName = nextUrl.pathname;
  const isAdminRoute = pathName.startsWith("/admin");
  const authRoutes = ["/signin", "/signup", "/forgot-password", "admin"];
  const isAuthRoute = authRoutes.some((uri) => pathName.startsWith(uri));
  const session = req.auth;

  if (isAdminRoute && !session?.user) {
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }

  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/admin/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
