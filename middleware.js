// middleware.js
//
// Gates everything under /admin behind NextAuth. The signIn callback in
// app/api/auth/[...nextauth]/route.js further restricts this to Ian's own
// GitHub account -- this middleware just handles "is there a valid
// session at all," redirecting to GitHub sign-in if not.
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"],
};
