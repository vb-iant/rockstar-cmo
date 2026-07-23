// app/admin/logout/route.js
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "../../../lib/adminSession";

export async function GET(request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}
