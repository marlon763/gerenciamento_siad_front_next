import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", whenAutenticated: "redirect" },
  { path: "/cadastrar", whenAutenticated: "redirect" },
  { path: "/dashboard", whenAutenticated: "protected" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authtoken = req.cookies.get("token")?.value;

  //console.log(authtoken);

  if (!authtoken && publicRoute) {
    return NextResponse.next();
  }

  // if (!authtoken && !publicRoute) {
  //   const redirectUrl = req.nextUrl.clone();

  //   redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

  //   return NextResponse.redirect(redirectUrl);
  // }

  if (authtoken && publicRoute && publicRoute.whenAutenticated === "redirect") {
    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  // if (authtoken && !publicRoute) {

  // }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
