// import { getToken } from 'next-auth/jwt';
// import withAuth from 'next-auth/middleware';
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside

// export default withAuth(
//      async function middleware(request: NextRequest) {
//        const pathname = request.nextUrl.pathname;
//        const isAuth = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//        console.log("🔹 isAuth Token Data:", isAuth);
   
//        console.log("🔹 Current Path:", pathname);
//        console.log("🔹 User Authenticated:", isAuth ? "✅ Yes" : "❌ No");
   
//        const ProtectedRoute = ["/profile", "/dashboard"];
//        const isAuthRoute = pathname.startsWith("/auth/signin");
//        const isProtectedRoute = ProtectedRoute.some((route) => pathname.startsWith(route));
   
//        if (!isAuth && isProtectedRoute) {
//          console.log("🔄 Redirecting to /auth/signin...");
//          return NextResponse.redirect(new URL("auth/signin", request.url));
//        }
//        if (isAuthRoute && isAuth) {
//          console.log("🔄 Redirecting to /profile...");
//          return NextResponse.redirect(new URL("/profile", request.url));
//        }
//      },
//      {
//        callbacks: {
//          async authorized() {
//            return true;
//          },
//        },
//      }
//    );
   

 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher:[
//      '/profile/:path*',
//      '/dashboard/:path*',
//      '/auth/signin'
//   ],
// }
import { getToken } from 'next-auth/jwt';
import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    console.log("🔹 isAuth Token Data:", isAuth);
    console.log("🔹 Current Path:", pathname);
    console.log("🔹 User Authenticated:", isAuth ? "✅ Yes" : "❌ No");

    const ProtectedRoute = ["/profile", "/dashboard"];
    const isAuthRoute = pathname.startsWith("/auth/signin");
    const isProtectedRoute = ProtectedRoute.some((route) => pathname.startsWith(route));

    if (!isAuth && isProtectedRoute) {
      console.log("🔄 Redirecting to /auth/signin...");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    if (isAuthRoute && isAuth) {
      console.log("🔄 Redirecting to /profile...");
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/profile/:path*',
    '/dashboard/:path*',
    '/auth/signin'
  ],
};