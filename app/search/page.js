// app/search/page.js
//
// Site-wide search over blog posts + podcast episodes. Server-rendered from
// ?q= / ?type= / ?page= (reading searchParams makes the route dynamic, same
// as /blog and /episodes). No client JS: a plain GET <form>, plain <Link>s
// for the type tabs and pagination.
import Link from "next/link";
import { searchSite, getSearchTotals, normalizeQuery } from "../../lib/site-search";
import { formatDuration } from "../../lib/formatDuration";

const PER_PAGE = 10;

export const metadata = {
  title: "Search | Rockstar CMO",
  description: "Search every Rockstar CMO blog post and podcast episode.",
  // Result pages are infinite, thin and duplicate-ish: keep them out of the
  // index, but let crawlers follow through to the real posts/episodes.
  robots: { index: false, follow: true },
};

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Build /search URLs that always carry the current query (and type) forward.
function searchHref({ q, type, page }) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (type && type !== "all") params.set("type", type);
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

const TYPE_LABELS = { all: "All", post: "Posts", episode: "Episodes" };

export default function SearchPage({ searchParams }) {
  const q = normalizeQuery(first(searchParams?.q));
  const typeParam = first(searchParams?.type);
  const type = typeParam === "post" || typeParam === "episode" ? typeParam : "all";

  const totals = getSearchTotals();
  const { results, matchCounts } = searchSite(q, type);

  const pageParam = parseInt(first(searchParams?.page) ?? "1", 10);
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageResults = results.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Search</h1>

      <form method="get" action="/search" role="search" className="search-form">
        <label htmlFor="site-search" className="visually-hidden">
          Search Rockstar CMO
        </label>
        <input
          id="site-search"
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search posts and episodes"
          autoComplete="off"
          autoFocus={!q}
          className="search-input"
        />
        {type !== "all" && <input type="hidden" name="type" value={type} />}
        <button type="submit" className="btn-primary search-submit">
          Search
        </button>
      </form>

      {!q && (
        <p style={{ color: "#333" }}>
          Search {totals.post} blog posts and {totals.episode} podcast episodes by topic, guest, author
          or title.
        </p>
      )}

      {q && matchCounts.all === 0 && (
        <p style={{ color: "#333" }}>
          No results for &ldquo;{q}&rdquo;. Try fewer words or a different spelling.
        </p>
      )}

      {q && matchCounts.all > 0 && (
        <>
          <ul className="search-tabs" aria-label="Filter results by type">
            {["all", "post", "episode"].map((t) => (
              <li key={t}>
                <Link
                  href={searchHref({ q, type: t })}
                  className={`search-tab${t === type ? " search-tab-active" : ""}`}
                  aria-current={t === type ? "page" : undefined}
                >
                  {TYPE_LABELS[t]} ({matchCounts[t]})
                </Link>
              </li>
            ))}
          </ul>

          {results.length === 0 ? (
            <p style={{ color: "#333" }}>
              No {TYPE_LABELS[type].toLowerCase()} match &ldquo;{q}&rdquo;.{" "}
              <Link href={searchHref({ q })} className="blog-hover-red" style={{ fontWeight: 600 }}>
                Show all {matchCounts.all} results
              </Link>
            </p>
          ) : (
            <ol className="search-results">
              {pageResults.map((r) => (
                <li key={r.href} className={`search-result${r.image ? "" : " search-result-noimage"}`}>
                  {r.image && (
                    <Link href={r.href} className="search-result-thumb" aria-hidden="true" tabIndex={-1}>
                      <img
                        src={r.image}
                        alt=""
                        width={112}
                        height={112}
                        loading="lazy"
                        className={r.type === "post" ? "blog-image" : undefined}
                      />
                    </Link>
                  )}
                  <div>
                    <p className="search-result-meta">
                      <span className={`search-type-pill search-type-pill-${r.type}`}>
                        {r.type === "post" ? "Post" : "Episode"}
                      </span>
                      {/* date + episode duration are one span so they wrap together;
                          the author link stands alone (no dangling separator) */}
                      <span>
                        {formatDate(r.date)}
                        {r.type === "episode" && r.duration ? ` \u00B7 ${formatDuration(r.duration)}` : ""}
                      </span>
                      {r.type === "post" && r.author && r.authorSlug && (
                        <Link href={`/tags/author/${r.authorSlug}`} className="blog-hover-red">
                          {r.author}
                        </Link>
                      )}
                    </p>
                    <h2 className="search-result-title">
                      <Link href={r.href} className="blog-hover-red">
                        {r.title}
                      </Link>
                    </h2>
                    {r.snippet && <p className="search-result-snippet">{r.snippet}</p>}
                  </div>
                </li>
              ))}
            </ol>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Search result pages"
              style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}
            >
              {safePage > 1 ? (
                <Link href={searchHref({ q, type, page: safePage - 1 })} className="blog-hover-red">
                  &larr; Previous
                </Link>
              ) : (
                <span />
              )}
              <span style={{ color: "#666" }}>
                Page {safePage} of {totalPages}
              </span>
              {safePage < totalPages ? (
                <Link href={searchHref({ q, type, page: safePage + 1 })} className="blog-hover-red">
                  Next &rarr;
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      )}
    </main>
  );
}
