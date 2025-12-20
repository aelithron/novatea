import { NextRequest } from "next/server";
export function validateAuth(req: NextRequest): boolean {
  if (!process.env.ADMIN_TOKEN) return false;
  const authCookie = req.cookies.get("admin_token");
  if (authCookie && authCookie.value === process.env.ADMIN_TOKEN) return true;
  return false;
}