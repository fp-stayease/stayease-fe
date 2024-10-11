import { NextRequest, NextResponse } from "next/server";

type RouteHandler = (
  session: any,
  request: NextRequest,
) => boolean | NextResponse;

const publicRoutes = new Set([
  "/login",
  "/register",
  "/reset-password",
  "/register/verify",
  "/about",
  "/properties",
  "/properties/*",
  "/faq",
  "/error-test",
  "/unauthorized",
]);

const routeHandlers = new Map<string, RouteHandler>([
  ["/dashboard/user", (session) => session.user.userType === "USER"],
  ["/dashboard/properties", (session) => session.user.userType === "TENANT"],
  ["/dashboard/rates", (session) => session.user.userType === "TENANT"],
  [
    "/dashboard/rates/settings",
    (session) => session.user.userType === "TENANT",
  ],
  [
    "/dashboard",
    (session) => ["USER", "TENANT"].includes(session.user.userType),
  ],
  ["/profile", (session) => session],
  ["/settings", (session) => session],
  ["/profile/settings/verify-email", (session) => session],
  ["/bookings", (session) => session.user.userType === "USER"],
  [
    "/register/select-user-type",
    (session, request) =>
      session.user.isNewUser ||
      NextResponse.redirect(new URL("/", request.url)),
  ],
  ["/book", (session) => session.user.userType === "USER"],
  ["/payment", (session) => session.user.userType === "USER"],
]);

export function isPublicRoute(path: string): boolean {
  if (publicRoutes.has(path)) {
    return true;
  }

  // Check for wildcard patterns
  for (const route of Array.from(publicRoutes)) {
    if (route.endsWith("*") && path.startsWith(route.slice(0, -1))) {
      return true;
    }
  }

  return false;
}

export function getRouteHandler(path: string): RouteHandler | undefined {
  const exactMatch = routeHandlers.get(path);
  if (exactMatch) {
    return exactMatch;
  }

  // Check for wildcard patterns
  for (const route of Array.from(routeHandlers.keys())) {
    if (route.endsWith("*") && path.startsWith(route.slice(0, -1))) {
      return routeHandlers.get(route);
    }
  }

  const partialMatch = Array.from(routeHandlers.keys()).find((route) =>
    path.startsWith(route),
  );

  return partialMatch ? routeHandlers.get(partialMatch) : undefined;
}
