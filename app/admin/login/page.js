// app/admin/login/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, COOKIE_NAME } from "../../../lib/adminSession";

export const metadata = {
  title: "Admin sign in | Rockstar CMO",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({ searchParams }) {
  const callbackUrl = searchParams?.callbackUrl || "/admin";

  async function login(formData) {
    "use server";
    const password = formData.get("password");
    const cb = formData.get("callbackUrl") || "/admin";

    if (password && password === process.env.ADMIN_PASSWORD) {
      const token = await createSessionToken(process.env.ADMIN_SESSION_SECRET);
      cookies().set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      redirect(cb);
    }

    redirect(`/admin/login?error=1&callbackUrl=${encodeURIComponent(cb)}`);
  }

  return (
    <main style={{ maxWidth: "400px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Admin sign in</h1>
      {searchParams?.error && (
        <p style={{ color: "#F22F29", marginBottom: "1rem" }}>Incorrect password.</p>
      )}
      <form action={login}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoFocus
          style={{
            width: "100%",
            padding: "0.6rem 0.75rem",
            marginBottom: "1rem",
            border: "1px solid #e5e5e5",
            borderRadius: "6px",
            fontSize: "1rem",
          }}
        />
        <button type="submit" className="btn-primary" style={{ border: "none", cursor: "pointer", width: "100%" }}>
          Sign in
        </button>
      </form>
    </main>
  );
}
