import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ message: "success" });

  // Sobrescribir cookie con expiración
  res.cookies.set("basketId", "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
    expires: new Date(0),
  });

  return res;
}
