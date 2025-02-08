import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  routeAccessMap,
} from "@/routes";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
const secret = process.env.AUTH_SECRET;

function createRouteMatcher(routes: string[]): (path: string) => boolean {
  // Compile the routes into regular expressions
  const regexes = routes.map(route => new RegExp(`^${route}$`));
  // Return a function that tests if a given path matches any of the compiled regexes
  return (path: string) => {
    return regexes.some(regex => regex.test(path));
  };
}

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

const { auth } = NextAuth(authConfig);

//@ts-expect-error
export default auth(async function middleware(req: NextRequest, res:NextResponse){
  const { nextUrl } = req;
  const token = await getToken({ req, secret });
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // If the request is for a api route, continue
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // If the request is for a public route, continue
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }

  //@ts-expect-error
  const userRole = token?.role.toLowerCase()

  if (userRole) {
    let accessAllowed = false;
    for (const { matcher, allowedRoles } of matchers) {
      if (matcher(nextUrl.pathname)) {
        if (allowedRoles.includes(userRole)) {
          accessAllowed = true;
          break;
        } else {
          const redirectUrl = `/${userRole}`;
          // Prevent infinite loop by checking if the current URL is already the redirect URL
          if (nextUrl.pathname !== redirectUrl) {
            return NextResponse.redirect(new URL(redirectUrl, nextUrl));
          } else {
            return NextResponse.next();
          }
        }
      }
    }
    if (accessAllowed) {
      return NextResponse.next();
    } else {
      // If no access is allowed for the current path, redirect to the user's role-based URL
      const redirectUrl = `/${userRole}`;
      if (nextUrl.pathname !== redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, nextUrl));
      }
    }
  }

  return NextResponse.next();
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", '/(api|trpc)(.*)'],
}
