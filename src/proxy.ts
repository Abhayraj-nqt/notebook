import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { ROUTES } from "./constants/routes";

export async function proxy(request: NextRequest) {
  // getSessionCookie is a fast, synchronous check that doesn't hit the DB
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/notes"],
};
