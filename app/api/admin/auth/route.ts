import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "body was invalid or malformed, please send valid JSON!" }, { status: 400 });
  }
  if (!process.env.ADMIN_TOKEN) return NextResponse.json({ success: false, error: "no_admin_token", message: "admin portal isn't set up, please add an ADMIN_TOKEN to environment variables!" }, { status: 500 });
  if (!body.token || (body.token as string).trim().length < 1) return NextResponse.json({ success: false, error: "missing_token", message: "no token was provided!" }, { status: 401 });
  if ((body.token as string).trim() === process.env.ADMIN_TOKEN) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", body.token, { path: "/", secure: true, sameSite: "strict", maxAge: 86400 });
    return res;
  } else {
    return NextResponse.json({ success: false, error: "invalid_token", message: "incorrect token!" }, { status: 403 });
  }
}
export async function DELETE(): Promise<NextResponse> {
  const res = new NextResponse();
  res.cookies.delete("admin_token");
  return res;
}