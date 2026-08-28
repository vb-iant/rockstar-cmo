# Redirects

Old WordPress URL -> new Next.js URL, accumulated across migration phases.
Wired up in `next.config.mjs` via `redirects()`.

## blogRedirects.json
373 entries covering all migrated regular blog posts. Old WP posts were flat,
root-level permalinks (`rockstarcmo.com/<slug>/`) and the slug carried through
unchanged into the new site (`/blog/<slug>`), so this is a 1:1 mechanical
mapping — no manual review needed. Generated from each post's `sourceUrl`
frontmatter field in `content/blog/*.md`.

## Not yet covered (needs more source data before it can be added here)
- **32 issue digests** (e.g. "The Nevermind Issue") -> their new `/tags/issue/<slug>`
  pages. These were also flat root-level WP posts, but their exact old paths
  weren't captured in any file still in this repo/project (only in the original
  WXR export, which isn't part of this project). Need either the original WXR
  export re-pulled, or the old URLs sourced from Search Console/site crawl.
- **Series pages** (Backstage, The Swimming Pool, etc.) -> `/tags/series/<slug>`.
  Old URLs were WordPress category archives, and at least one (`the-swimming-pool`)
  is known to be nested (`/category/features/the-swimming-pool/`) rather than a
  flat `/category/<slug>/` — so these can't be safely guessed from the naming
  convention alone and need the real per-category archive URL from the export
  or a crawl.
- **Author archives** (40 authors) -> `/tags/author/<slug>`. Same issue as series:
  old author archive URLs need confirming rather than assumed.
- **385 podcast episode posts** -> `/episodes/<slug>`. Phase 1 shipped the new
  episode pages but no old->new URL mapping for the original WP podcast posts
  has been built yet.

Once old URLs for these are available, add a matching `*Redirects.json` file
here and spread it into the `redirects()` array in `next.config.mjs`, same
pattern as `blogRedirects.json`.
