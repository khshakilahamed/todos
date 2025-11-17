import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_KEYS } from "./constants";

export async function proxy(request: NextRequest) {
      const { pathname } = request.nextUrl;

      const cookieStore = await cookies()
      const accessToken = cookieStore.get(AUTH_KEYS.ACCESS_TOKEN);

      // console.log("accessToken: middleware ", accessToken?.value);

      // If no access token, redirect to login
      if (!accessToken) {
            if (pathname === "/login") {
                  return NextResponse.next();
            } else {
                  return NextResponse.redirect(new URL("/login", request.url));
            }
      }

      // if has access token, block these routes
      if (pathname === "/login" || pathname === "/register") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
      }
}

export const config = {
      matcher: ["/login", "/register", "/dashboard/:path*"],
};