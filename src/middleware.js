// ! the below middleware is not working because it relies on the auth() which uses the mongoose and mongoose is not compattible with edge runtimes
// import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';
// import { auth } from '@/auth';

// export default auth((req) => {
//  const { nextUrl } = req;

//  const isAuthenticated = !!req.auth;
//  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

//  if (isPublicRoute && isAuthenticated)
//   return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

//  if (!isAuthenticated && !isPublicRoute)
//   return Response.redirect(new URL(ROOT, nextUrl));
// });

// export const config = {
//  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET, secureCookie });

  console.log("Token at vercel", token);
  
  if (!token) {
    // Redirect to sign-in page if the token is not found
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/puzzles"],
};
