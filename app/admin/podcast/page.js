// app/admin/podcast/page.js
//
// Moved here from the old unauthenticated app/podcast/update/page.js
// (which fired the rebuild on *any* GET request -- fine when it was an
// obscure unlinked URL, not fine now that there's a real admin area).
// Also changed from auto-fire-on-visit to an explicit button + Server
// Action, so a prefetch or crawler hit can't trigger a rebuild by
// accident.
export const dynamic = "force-dynamic";

const DEPLOY_HOOK_URL =
  "https://api.vercel.com/v1/integrations/deploy/prj_cKjr2rR80gWgpU77XaP1oSSoflyV/9mp8QzOfUA";

async function triggerRebuild() {
  "use server";
  try {
    const res = await fetch(DEPLOY_HOOK_URL, { method: "POST" });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: null, error: String(err) };
  }
}

export default function AdminPodcastPage() {
  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "0.75rem" }}>Refresh podcast feed</h1>
      <p style={{ color: "#333", marginBottom: "1.5rem" }}>
        Triggers a rebuild, which re-fetches the Megaphone RSS feed and republishes any new
        episodes. Use this after publishing a new episode on Megaphone.
      </p>
      <form
        action={async () => {
          "use server";
          await triggerRebuild();
        }}
      >
        <button type="submit" className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
          Trigger rebuild
        </button>
      </form>
      <p style={{ color: "#666", fontSize: "0.85rem", marginTop: "1rem" }}>
        Takes a minute or two to appear live once triggered.
      </p>
    </main>
  );
}
