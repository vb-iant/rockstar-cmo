// lib/adminSession.js
//
// Minimal signed-cookie session for the admin password gate. Deliberately
// not pulling in a library (next-auth, jose, etc.) for this -- it's a
// single boolean "is this Ian" check, and an HMAC-signed cookie is enough
// to make it tamper-proof without a database or token store.
//
// Uses the Web Crypto API (globalThis.crypto.subtle) rather than Node's
// `crypto` module, since middleware.js runs on the Edge runtime by
// default and doesn't have Node's crypto -- Web Crypto works in both
// places, so the same code runs in the Edge middleware and in the Node
// server action that issues the cookie.
//
// This is intentionally a stopgap: Google OAuth is planned as the next
// phase (see CTRL Dev board), at which point this file and the /admin
// login/logout routes get replaced entirely.

export const COOKIE_NAME = "rcmo_admin_session";
const SESSION_DAYS = 30;

function base64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return base64url(signature);
}

export async function createSessionToken(secret) {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const sig = await hmac(secret, String(expires));
  return `${expires}.${sig}`;
}

export async function verifySessionToken(token, secret) {
  if (!token || !secret) return false;
  const [expiresStr, sig] = token.split(".");
  if (!expiresStr || !sig) return false;
  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;
  const expectedSig = await hmac(secret, expiresStr);
  return expectedSig === sig;
}
