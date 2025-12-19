import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const adminCookie = req.cookies.get("admin_token");
  if (!adminCookie || !process.env.ADMIN_TOKEN || adminCookie.value !== process.env.ADMIN_TOKEN) return NextResponse.redirect(new URL("/auth", req.url));
}
export const config = { matcher: "/admin/:path*" };