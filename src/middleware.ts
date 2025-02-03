import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  routeAccessMap,
} from "@/routes";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

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
export default auth((req) => {
  const { nextUrl} = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role; 
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const redirectUrl:string = `/${userRole}`
      return Response.redirect(new URL(redirectUrl.toLowerCase(), nextUrl))
    }
    return null;
  }

  if (nextUrl.pathname === "/" && !isLoggedIn) {
    return Response.redirect(new URL(`/auth/login`, nextUrl));
  }

  if (isLoggedIn) {
    const role = userRole!.toLocaleLowerCase()

    if (nextUrl.pathname === "/") {
      return Response.redirect(new URL(`/${role}`, nextUrl));
    }
    
    for (const { matcher, allowedRoles } of matchers) {
      if (matcher(nextUrl.pathname) && !allowedRoles.includes(role)) {
        return Response.redirect(new URL(`/${role}`, nextUrl));
      } 
    }
  
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    for (const { matcher } of matchers) {
      if (matcher(callbackUrl) ) {
        return Response.redirect(new URL(
          `/auth/login?callbackUrl=${encodedCallbackUrl}`,
          nextUrl
        ));
      }
    }
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", '/(api|trpc)(.*)'],
}
