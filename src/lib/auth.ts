import { cookies } from "next/headers";

const cookieName = "kulogullari_admin";

export async function isAdmin() {
  const store = await cookies();
  return store.get(cookieName)?.value === (process.env.ADMIN_SESSION_TOKEN || "demo-admin");
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(cookieName, process.env.ADMIN_SESSION_TOKEN || "demo-admin", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}

export function validateAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "admin12345";
  return password === expected;
}
