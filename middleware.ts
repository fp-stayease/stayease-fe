import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { isPublicRoute, getRouteHandler } from "./utils/routeHandlers";
import propertyService from "@/services/propertyService";
import logger from "@/utils/logger";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;
  logger.info("session from middleware:", { session });

  if (isPublicOrHomePage(path)) {
    return NextResponse.next();
  }

  if (!session) {
    return redirectToLogin(request);
  }

  const redirectResult = handleSpecialCases(session, path, request);
  if (redirectResult) {
    return redirectResult;
  }

  return handleRouteAccess(session, path, request);
}

function isPublicOrHomePage(path: string): boolean {
  return path === "/" || isPublicRoute(path);
}

function redirectToLogin(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL("/login", request.url));
}

function handleSpecialCases(
  session: any,
  path: string,
  request: NextRequest,
): NextResponse | null {
  if (isNewOAuthUser(session) && path !== "/register/select-user-type") {
    return NextResponse.redirect(
      new URL("/register/select-user-type", request.url),
    );
  }

  if (isLoggedInUserAccessingAuthPages(session, path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (path.startsWith("/dashboard/properties") && path.endsWith("/edit")) {
    if (!isPropertyOwner(session, path)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return null;
}

function isNewOAuthUser(session: any): boolean {
  return session.user.isNewUser && session.user.googleToken;
}

function isLoggedInUserAccessingAuthPages(session: any, path: string): boolean {
  return session && ["/login", "/register"].includes(path);
}

function handleRouteAccess(
  session: any,
  path: string,
  request: NextRequest,
): NextResponse {
  const handler = getRouteHandler(path);
  if (handler) {
    const result = handler(session, request);
    if (result instanceof NextResponse) {
      return result;
    }
    return result
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.redirect(new URL("/unauthorized", request.url));
}

async function isPropertyOwner(session: any, path: any): Promise<boolean> {
  const propertyId = path.split("/")[3];
  return await propertyService.checkPropertyOwnership(propertyId);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icon.ico).*)",
    "/login|/register|/register/verify|/dashboard",
  ],
};
