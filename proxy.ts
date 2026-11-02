import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { expectedAccessCookie } from "@/lib/siteAccess";

// Protège le site de test par un mot de passe (variable d'environnement
// SITE_PASSWORD). Si SITE_PASSWORD n'est pas définie (ex. en local), le
// site reste librement accessible : rien à configurer pour développer.
export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const cookie = request.cookies.get("abc_access")?.value;
  if (cookie === expectedAccessCookie(password)) {
    return NextResponse.next();
  }

  const url = new URL("/acces", request.url);
  url.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!acces|api/acces|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)",
  ],
};
