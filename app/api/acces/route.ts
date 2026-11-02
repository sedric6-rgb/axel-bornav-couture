import { NextRequest, NextResponse } from "next/server";
import { expectedAccessCookie } from "@/lib/siteAccess";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const from = String(form.get("from") ?? "/");
  const expected = process.env.SITE_PASSWORD;

  const url = new URL(from.startsWith("/") ? from : "/", req.url);

  if (!expected || password !== expected) {
    const errorUrl = new URL("/acces", req.url);
    errorUrl.searchParams.set("from", from);
    errorUrl.searchParams.set("error", "1");
    return NextResponse.redirect(errorUrl, { status: 303 });
  }

  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set("abc_access", expectedAccessCookie(password), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}
