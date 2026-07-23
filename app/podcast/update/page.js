// app/podcast/update/page.js
//
// Retired 2026-07-23: this used to fire the Vercel rebuild hook on any
// unauthenticated GET request. Replaced by app/admin/podcast/page.js,
// which sits behind admin auth and requires an explicit button click.
// Kept as a redirect so any old bookmark still lands somewhere useful.
import { redirect } from "next/navigation";

export default function LegacyUpdatePage() {
  redirect("/admin/podcast");
}
