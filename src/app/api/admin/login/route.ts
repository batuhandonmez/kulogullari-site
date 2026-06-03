import { NextResponse } from "next/server";
import { setAdminSession, validateAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!validateAdminPassword(password || "")) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
