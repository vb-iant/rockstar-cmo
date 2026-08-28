# Redirects

Old WordPress URL -> new Next.js URL, accumulated across migration phases.
Wired up in `next.config.mjs` via `redirects()`. Each file below just needs
to be added to the `loadRedirects(...)` calls in `next.config.mjs` to go live.

## blogRedirects.json (373)
All migrated regular blog posts. Old WP posts were flat, root-level permalinks
(`rockstarcmo.com/<slug>/`) and the slug carried through unchanged into the new
site (`/blog/<slug>`), so this is a 1:1 mechanical mapping from each post's
`sourceUrl` frontmatter field in `content/blog/*.md` — no manual review needed.

## authorRedirects.json (40)
`/author/<old-nicename>` -> `/tags/author/<repo-slug>`. Old nicenames were
pulled from the live WP REST API (`/wp-json/wp/v2/users`), not guessed from
display names — several don't follow the obvious slug pattern (e.g. WP nicename
`keithsmith` / `janescandurra` / `rachelmiller` have no hyphen, while the repo's
tag slugs do: `keith-smith`, `jane-scandurra`, `rachel-miller`). Matched 40/40
by normalized display name, cross-checked against internal author-bio links
found in the WXR content.

## issueRedirects.json (62 = 31 digests x 2 URLs each)
Covers both URL forms that pointed at the same issue on the old site:
- the digest post itself (`/<slug>`)
- its category archive (`/category/issues/<slug>`)

Both -> `/tags/issue/<slug>`. The digest post's own WP slug turned out to be
identical to the issue's collector-category slug in every case (e.g. post
`/nevermind/` and category `nevermind` are the same string) — a cleaner,
more direct match than the title-normalization approach used in the original
migration-plan analysis. 31/32 issues covered; the 32nd ("The Miseducation of
Lauryn Hill Issue") was never published on WP (draft, only a `?p=` link, no
real old URL), so there's nothing to redirect from.

## seriesRedirects.json (12)
`/category/<full-nested-path>` -> `/tags/series/<slug>`. WP category URLs
aren't all flat `/category/<slug>/` — some are nested under a parent category
(e.g. `the-swimming-pool` is `/category/features/the-swimming-pool/`), so
paths were built from each category's real parent chain in the export, not
assumed. Note: 4 of these 12 (`features`, `features-2`, `rockstar-cmo-advisors`,
`street-knowledge`) are the WP-era categories the 2026-07-23 handoff flagged as
"no real signal, workaround, drop entirely" — their `/tags/series/...` pages
are still live today so the redirects are safe to ship now, but if those pages
get retired later these 4 entries should come out too.

## episodeRedirects.json (390)
`/<old-wp-podcast-slug>` -> `/episodes/<new-slug>`. New episode slugs are
generated from the Megaphone RSS `<title>` at build time (not stored in git —
`content/episodes.json` is a build artifact), and don't match the old WP post
slug format (WP slugs carry a numeric episode prefix the new slugs drop, e.g.
WP `336-the-4-ps-of-being-a-cmo-...` -> new `the-4-p-s-of-being-a-cmo-...`).
Matched by normalizing both titles (stripping episode-number prefixes, HTML
entities, and a leading "The") — 384/390 matched exactly this way, the
remaining 6 needed a fuzzy-match pass (>=0.85 similarity) for minor title
wording differences between WP and Megaphone (all manually eyeballed and
confirmed correct — see episode_matches_v2 in the working session if this
needs re-deriving). 49 WP podcast posts and 0 RSS episodes had no counterpart
at all — those 49 are all "The Rose & Rockstar" spin-off episodes recorded
before the RSS feed existed in its current form, or one-offs with genuinely
different titles; none were left unresolved.

## Still not covered
Nothing identified as needing a redirect is currently missing. If more legacy
content types turn up (e.g. the 3 flipbook pages already match their old URLs
exactly per `tm-1784480426040`, so no redirect needed there), add a new
`*Redirects.json` file here and wire it into `next.config.mjs`.
