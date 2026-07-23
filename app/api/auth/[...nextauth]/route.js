// app/api/auth/[...nextauth]/route.js
//
// Single-user auth for the admin area: GitHub OAuth, but the signIn
// callback rejects anyone whose GitHub login isn't Ian's own account.
// This is deliberately the "simplest auth" version -- no roles, no user
// table, just an allowlist of one.

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const ALLOWED_GITHUB_LOGIN = "vb-iant";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile?.login === ALLOWED_GITHUB_LOGIN;
    },
  },
  pages: {
    // Deliberately NOT under /admin -- that path is gated by middleware.js,
    // and since a rejected sign-in has no session, landing this page under
    // /admin would immediately bounce back to sign-in again (infinite loop).
    error: "/access-denied",
  },
});

export { handler as GET, handler as POST };
