// app/podcast/update/page.js
//
// Manual rebuild trigger. Visit this page after publishing a new episode
// on Megaphone to tell Vercel to rebuild the site (which re-fetches the
// RSS feed via scripts/fetch-episodes.mjs during the build).
//
// This route must run fresh on every visit (not be statically cached),
// since its whole purpose is to fire a real request each time.
export const dynamic = "force-dynamic";

const DEPLOY_HOOK_URL =
  "https://api.vercel.com/v1/integrations/deploy/prj_cKjr2rR80gWgpU77XaP1oSSoflyV/9mp8QzOfUA";

async function triggerRebuild() {
  try {
    const res = await fetch(DEPLOY_HOOK_URL, { method: "POST" });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: null, error: String(err) };
  }
}

export default async function UpdatePage() {
  const result = await triggerRebuild();
  const now = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
      {result.ok ? (
        <>
          <h1>Rebuild triggered</h1>
          <p style={{ color: "#333" }}>
            Vercel has been told to rebuild the site. The new episode should
            appear within a minute or two.
          </p>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>Triggered at {now}</p>
        </>
      ) : (
        <>
          <h1>Something went wrong</h1>
          <p style={{ color: "#333" }}>
            The rebuild request did not succeed (status: {result.status ?? "no response"}).
            Try again in a moment, or trigger a redeploy from the Vercel dashboard directly.
          </p>
        </>
      )}
    </main>
  );
}
