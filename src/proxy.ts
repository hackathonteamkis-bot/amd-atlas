import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// Helper to check for static PWA assets
const isStaticAsset = (path: string) => 
  path === "/manifest.json" || 
  path === "/sw.js" || 
  path.startsWith("/workbox-");

const publicRoutesSet = new Set(publicRoutes);
const authRoutesSet = new Set(authRoutes);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  // Skip auth for static PWA files
  if (isStaticAsset(pathname)) {
    return;
  }

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return;
  }

  const isAuthRoute = authRoutesSet.has(pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !publicRoutesSet.has(pathname)) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Exclude static files including json (manifest.json) and js (sw.js)
    "/((?!_next|[^?]*\\.(?:html?|css|js|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
