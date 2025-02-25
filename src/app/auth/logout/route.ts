// src/app/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.delete("token-user");
  response.cookies.delete("token-customer");

  return response;
}
