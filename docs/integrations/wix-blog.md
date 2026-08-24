# Wix Blog integration feasibility decision

- **Decision:** Conditional GO
- **Status:** Approved for phased implementation once the prerequisites and owner decisions below are satisfied
- **Audience:** Shepard and Team Normandy
- **Reviewed:** 2026-08-24
- **Scope:** Use Tammy's existing Wix Blog as the CMS while the React/Vite frontend remains hosted by Netlify

## Decision

Proceed with a narrow, read-only integration in this shape:

```text
Tammy publishes in Wix Blog
        |
        v
Wix Blog published-post API
        |
        v
Netlify Function adapter + cache
        |
        v
Leadership Learners-owned DTO
        |
        v
React blog UI
```

The conditional GO becomes implementation-ready when all of the following are true:

1. Tammy confirms the exact Wix site and public Wix Blog URL that own the content.
2. A Wix headless OAuth client can make anonymous visitor calls with only the `Read Blog` permission.
3. At least two representative published posts can be inspected, including their media, categories, links, and rich-content blocks.
4. Tammy and Thomas accept phase one's teaser-and-link behavior and Wix's published post URL as the canonical article URL.
5. Thomas confirms that the target Netlify project can run Functions and use the selected persistent-cache facility.

This decision does not authorize code, package, Netlify configuration, Wix configuration, domain, DNS, publishing, or credential changes. No Wix domain work is part of this integration: do not connect or move a domain, edit DNS, change Wix's blog URL structure, add URL redirects, or repoint production traffic.

## Current repository content flow

The repository currently has no CMS or network content source:

- `src/lib/blog-data.ts` exports three hard-coded placeholder posts.
- `src/types/blog.ts` defines a local `BlogPost` interface.
- `src/pages/Blog.tsx` imports that array and renders the `/blog` cards.
- `src/pages/BlogPost.tsx` imports the same array, resolves `/blog/:slug`, and renders placeholder body copy.
- `src/App.tsx` registers `/blog` and `/blog/:slug` with React Router.
- `netlify.toml` sends unmatched paths to `index.html`, so these routes are client-rendered SPA routes.
- `index.html` has one generic title and no post-specific canonical or metadata mechanism.
- `scripts/write-staging-headers.mjs` writes `X-Robots-Tag: noindex, nofollow` for Netlify Deploy Previews and the `staging` branch deploy.

The three repository posts and their body text are placeholders, not an approved content backup. **Placeholder repository blog posts must never be fallback content.** When the CMS and all approved caches are unavailable, the UI must show an explicit unavailable/empty state rather than silently displaying those records.

## Options considered

| Option | Decision | Reason |
| --- | --- | --- |
| Keep repository posts as the CMS | Reject | Requires developer deployments for editorial changes and the existing records are placeholders. |
| Link directly to Wix without a feed | Viable minimum | Lowest integration risk, but the Netlify blog page cannot automatically show current teasers. Useful as an emergency launch option. |
| Fetch Wix directly from React | Reject | Couples presentation code to Wix authentication, response shapes, errors, and API changes; it also weakens server-side cache and observability control. |
| Consume Wix RSS | Limited fallback only | Credential-free and simple, but Wix documents a maximum of 20 recent posts and no category feeds. RSS is not a complete summary/detail CMS contract. |
| Use Wix Blog through a Netlify Function adapter | Select | Keeps Wix and token handling behind one boundary, permits schema validation and caching, and gives React a stable site-owned contract. |
| Copy or synchronize full posts into the repository | Reject for phase one | Creates a second source of truth and an editorial reconciliation problem. |
| Render complete Wix posts on Netlify immediately | Defer | Requires rich-content corpus validation, renderer/security decisions, and a canonical/metadata strategy that the current Vite SPA does not provide. |

## Selected architecture

### Source and authentication boundary

Use the official Wix JavaScript SDK from a Netlify Function because this is a JavaScript/TypeScript project; keep direct REST as a test/debug reference, not a second production path. The function is the only code allowed to know Wix SDK types, token behavior, endpoint errors, or cache persistence. React calls only the site's endpoint and imports only site-owned DTOs.

The production read path must use Wix self-managed headless visitor OAuth:

- Create or identify one headless client for this Netlify-hosted website.
- Request/verify only the Wix Blog `Read Blog` permission used by Query Posts and Get Post By Slug.
- Use the headless client ID and anonymous visitor tokens. Wix states that visitor OAuth needs a client ID and **does not require a client secret**.
- Do not use a Wix API key, Wix login, client-secret admin flow, `Manage Blog`, or draft-post permission for the public read adapter.
- Do not expose access or refresh tokens to React, logs, error payloads, analytics, or source control.
- Keep the client ID as function configuration so the integration boundary remains server-owned even though Wix documents the client ID as a public identifier.
- Keep anonymous access/refresh tokens ephemeral to the Function runtime, refresh once on expiry/`401`, and never persist them in the content cache or Blobs.

Before implementation, validate the actual identity/permission combination against Tammy's site. A successful anonymous token exchange alone is not sufficient; Query Posts and Get Post By Slug must both succeed against a published post with only `Read Blog`.

### Phase-one recommendation: teasers on Netlify, articles on Wix

Phase one should replace the placeholder cards on `/blog` with normalized summaries of published Wix posts. Every card's primary action should be an ordinary crawlable link to the post's Wix-provided `url`, labeled clearly (for example, “Read on Wix”). Open in the same tab unless product direction explicitly requires otherwise.

Do not render full article bodies on Netlify in phase one. Remove or stop linking to the placeholder `/blog/:slug` experience when implementation begins; an old local slug may redirect only when it can be deterministically mapped to the corresponding validated Wix URL. Unknown slugs must not redirect to unrelated content.

This phase gives Tammy one editorial source of truth, avoids duplicate article pages, and makes Wix responsible for article rendering and article-level SEO while the richer headless path is evaluated.

### Site-owned contract outline

The names below are an architectural contract, not code to add in this spike. Wix response objects must be validated and mapped at the adapter boundary. Wix field names and Ricos structures must not flow through general React presentation components.

```ts
type BlogSummary = {
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAt: string       // ISO 8601
  updatedAt: string | null  // ISO 8601 when available
  canonicalUrl: string      // validated absolute HTTPS Wix URL in phase one
  image: {
    url: string
    alt: string | null
    width: number | null
    height: number | null
  } | null
  categories: Array<{ id: string; label: string }>
  byline: string | null
  minutesToRead: number | null
}

type BlogDetail = BlogSummary & {
  body: {
    format: 'site-blocks'
    blocks: SiteContentBlock[]
  }
}

type BlogResponse<T> = {
  data: T
  meta: {
    schemaVersion: 1
    fetchedAt: string
    stale: boolean
    source: 'wix-api' | 'last-known-good' | 'wix-rss'
  }
}
```

Contract rules:

- List queries omit rich content for smaller responses. Detail queries use Get Post By Slug and request the documented rich-content fieldset only in a later detail phase.
- Use `firstPublishedDate` for the original publication date and retain the Wix URL supplied by the post object.
- Resolve category IDs through the Wix Blog category API and cache the map. Do not guess labels from IDs.
- A post exposes an owner/member ID, not necessarily a display-ready author. Keep `byline` nullable in phase one rather than adding Members permission or inventing an author.
- Validate image URLs and dimensions; provide an accessible UI fallback when image data is absent. Never invent alt text from unavailable source data without editorial approval.
- Reject malformed required fields at the adapter boundary. Do not pass partially trusted Wix payloads directly to components.
- `SiteContentBlock` must be defined from an audit of Tammy's real posts. Unsupported Wix/Ricos block types should route readers to the canonical Wix article, not be discarded silently.

## Caching and outage behavior

Netlify does not cache Function responses by default. The implementation should use two layers:

1. **Response cache:** Return a `Netlify-CDN-Cache-Control` policy with `public`, `durable`, a short shared freshness period (starting recommendation: five minutes), and `stale-while-revalidate` (starting recommendation: one hour). Keep browser caching shorter so fixes can propagate. Confirm final values with Tammy's expected publishing urgency.
2. **Last-known-good store:** In production, after schema validation, persist normalized summary/detail records and `fetchedAt` metadata in a versioned, site-wide Netlify Blobs keyspace so a new production deploy can retain the previous good data. Do not overwrite a good record with a timeout, authentication error, rate-limit response, malformed payload, or empty result that has not passed an explicit empty-blog check. Deploy Previews must use a deploy-specific store or no persistent store and must never write the production last-known-good namespace.

On Wix timeout, `401`, `429`, `5xx`, or invalid data:

- Serve the last-known-good normalized response when it is within the agreed maximum staleness window (starting recommendation: seven days).
- Mark `meta.stale: true`, set `source: 'last-known-good'`, emit a short cache lifetime, and record a sanitized operational event.
- If no approved last-known-good value exists, return `503` with a stable machine-readable error. React shows a neutral “Blog posts are temporarily unavailable” state and an optional direct link to the confirmed Wix Blog home.
- Never cache credentials, raw exception objects, or an error response as successful content.
- Never fall back to `src/lib/blog-data.ts` or any other placeholder repository content.

**RSS is a limited credential-free fallback**, not an equivalent API. Wix documents that its blog RSS feed exposes at most the 20 most recent posts and cannot provide category feeds. If RSS is enabled as a fallback, validate its URL and mapping separately, label `meta.source` as `wix-rss`, use summaries and Wix links only, and do not claim complete pagination or detail support. RSS must not silently replace an API result that is legitimately empty.

## Editorial and preview workflow

1. Tammy writes, previews, schedules, and publishes in Wix Blog using Wix's native editorial interface and roles.
2. Draft review remains in Wix's preview experience. Publishing is the explicit handoff to the Netlify read path.
3. Netlify production and Deploy Previews query only Wix's published Posts API or an approved published-only cache/RSS response.
4. A Netlify Deploy Preview verifies UI and adapter behavior against published content; it is not a draft-CMS preview.
5. The existing repository build step keeps Deploy Previews and the `staging` branch deploy under `X-Robots-Tag: noindex, nofollow`.

**Draft/admin credentials must not enter Deploy Previews.** Do not set a Wix API key, client secret, Wix user token, `Manage Blog` credential, or draft-reading credential in the Deploy Previews context. Do not call Draft Posts APIs from preview functions. If the published-only visitor configuration is intentionally unavailable in a preview, use an explicit unavailable state or a validated published-only RSS mode—never placeholders.

## SEO and canonical constraints

- In phase one, Wix owns each article URL, indexable article HTML, article metadata, and canonical URL. The Netlify `/blog` page is a teaser/index page and links to Wix's post URL.
- Do not publish the same complete article at both a Wix URL and `/blog/:slug` without one approved canonical owner and matching canonical tags.
- The adapter must allow only the expected Wix HTTPS host in `canonicalUrl`; do not accept arbitrary URLs from a malformed payload.
- Preserve stable Wix slugs/URLs after publication. URL changes need an explicit redirect and canonical plan, but redirects and Wix domain work are outside this phase.
- The current Vite SPA has one static HTML shell and no per-post metadata/canonical generation. A later Netlify-hosted detail phase is conditional on adding verified prerendering, static generation, or SSR for post title, description, social metadata, canonical, indexability, status codes, and sitemap entries.
- Do not include unpublished, draft, scheduled-only, gated, or paid-member content in a public sitemap or teaser feed. Confirm whether Tammy uses Wix Pricing Plans or multilingual posts before expanding scope.

## Validation checklist for implementation

- [ ] Confirm the exact Wix site ID/project, Wix Blog home URL, expected Wix hostname, and Netlify production project.
- [ ] Confirm the Wix Blog app is installed and representative posts are publicly published.
- [ ] Exchange the headless client ID for an anonymous visitor token without a client secret.
- [ ] Prove Query Posts and Get Post By Slug work with only `Read Blog`; prove Draft Posts access is absent.
- [ ] Compare API title, excerpt, first publication date, slug, URL, categories, media, and reading time with Wix's public pages.
- [ ] Verify paging beyond 50 posts and the API's documented maximum page size of 100.
- [ ] Validate DTO parsing for missing excerpts/media/bylines, Unicode, long titles, changed slugs, and unsupported rich-content blocks.
- [ ] Confirm React imports no Wix SDK or Wix response types outside the adapter boundary.
- [ ] Confirm the browser receives no Wix access token, refresh token, secret, API key, or raw Wix error.
- [ ] Check `Cache-Status`/response metadata for fresh, durable, revalidated, and last-known-good paths.
- [ ] Simulate timeout, `401`, `429`, `5xx`, malformed JSON, empty results, and missing cache; verify stale or explicit `503` behavior.
- [ ] Verify placeholders never render when Wix and caches are unavailable.
- [ ] Verify phase-one links resolve to the correct public Wix posts and unknown slugs do not misredirect.
- [ ] Verify Deploy Previews contain no draft/admin credentials, return only published content, and retain `noindex, nofollow` headers.
- [ ] If RSS is enabled, verify the 20-post/category limitations are visible in tests and documentation.
- [ ] Run repository lint and build after implementation, then test responsive, keyboard, screen-reader, and empty/error states.

## Risks and mitigations

| Risk | Mitigation / gate |
| --- | --- |
| Required Wix access is not available | Keep the decision conditional; launch with a confirmed direct Wix Blog link or the explicitly limited RSS mode. Do not invent credentials. |
| Wix schema or SDK changes | Pin reviewed package versions during implementation, validate at the adapter, version the DTO/cache keys, and monitor sanitized errors. |
| Stale content after publishing | Start with five-minute shared freshness, one-hour SWR, expose `fetchedAt`, and define an owner-operated cache purge/revalidation procedure. |
| Wix outage or rate limiting | Durable CDN cache, bounded last-known-good Blobs data, request timeouts, limited retries with jitter, and a clear unavailable state. |
| Cache contamination across deploy contexts | Netlify documents site-wide Blobs as shared by all deploys and warns that branch deploys can affect production data. Production alone may write the site-wide last-known-good store; previews use deploy-specific/no persistence. For untrusted pull requests, disable Function/Blobs access or use a separate Netlify project because code-level namespacing is not a security boundary. |
| Draft or privileged data leakage | Use visitor OAuth + `Read Blog`; do not provision draft/admin credentials to Deploy Previews or public frontend code. |
| Duplicate-content SEO | Keep full articles on Wix in phase one; approve one canonical owner before Netlify detail pages exist. |
| Rich-content incompatibility | Audit real posts and supported blocks before phase two; link unsupported content to Wix rather than dropping it. |
| Incomplete RSS data | Treat RSS as recent teaser/link data only; never claim archive, category, or full-detail parity. |
| Author/category enrichment expands permissions | Keep byline nullable; use Blog category endpoints under `Read Blog`; require a new least-privilege review before adding Members access. |

## Concrete implementation sequence

1. Tammy and Thomas answer the decisions below and provide configuration through approved secure channels.
2. In Wix, create/confirm one website headless client and verify only published Blog reads with anonymous visitor OAuth and `Read Blog`. Make no domain changes.
3. Capture representative published API payloads without credentials and finalize runtime validators plus `BlogSummary`, response metadata, and versioned cache keys.
4. Add one Wix adapter used only by Netlify Functions. It owns SDK setup, anonymous token handling, timeouts, pagination, category mapping, URL allowlisting, DTO normalization, and sanitized errors.
5. Add summary/list Function endpoints, Netlify durable response caching, and versioned last-known-good Blobs persistence. Add detail lookup only as needed for deterministic old-slug redirects in phase one.
6. Replace `src/lib/blog-data.ts` consumption on `/blog` with the site-owned summary client, explicit loading/empty/error states, and direct Wix post links. Remove the placeholder detail experience from navigation.
7. Configure production and preview contexts so Functions receive only the published-read configuration intended for that context. Verify no draft/admin credential is present in Deploy Previews.
8. Execute the validation checklist, including forced outage and cache tests, then have Liara and Mordin perform read-only UX/accessibility and release-readiness reviews.
9. After real-content observation, decide separately whether phase two should render details on Netlify. Require a rich-content support matrix, sanitization/security review, canonical owner, server-rendered metadata approach, sitemap plan, and migration/redirect plan before approval.

## Decisions and access needed from Tammy and Thomas

### Tammy

- Confirm the Wix account/site/project and exact public Wix Blog home and post URL pattern.
- Confirm Wix Blog is the editorial source of truth and approve phase-one teaser links that send readers to Wix.
- Confirm whether posts use categories, authors, scheduled publishing, Wix Multilingual, paid/member-only content, embeds, galleries, video/audio, or other rich blocks.
- Provide two or more representative published post URLs for validation.
- Authorize a least-privilege headless client for published Blog reads. Share the client ID through the agreed configuration channel; do not share a Wix password or admin token.
- Confirm acceptable content freshness and maximum last-known-good age.

### Thomas

- Confirm the production Netlify project/site URL and who can set context-specific Function environment variables.
- Confirm Functions and Netlify Blobs are acceptable for the target plan and operating cost.
- Set the Wix client ID as Netlify-managed Function configuration after Wix validation; do not commit it to the repository. A visitor client ID is not a client secret, but keeping it at the adapter boundary preserves configuration control.
- Confirm whether Deploy Previews may read the same published Wix content or must run in unavailable/RSS-only mode.
- Confirm the expected Wix hostname allowlist and the operator/alert destination for integration failures.
- Approve the initial cache targets (five minutes fresh, one hour SWR, seven days maximum last-known-good) or provide alternatives.

No client secret, API key, Wix login, draft token, or admin credential is needed for the approved phase-one path. If testing shows visitor OAuth plus `Read Blog` is insufficient on Tammy's site, stop and return the evidence to Shepard; do not escalate permissions speculatively.

## Official sources

All sources were reviewed on **2026-08-24**.

### Wix

- [About self-managed headless](https://dev.wix.com/docs/go-headless/self-managed-headless/about-self-managed-headless)
- [Quick start from an existing Wix site](https://dev.wix.com/docs/go-headless/get-started/quick-starts/self-managed-headless/quick-start-from-an-existing-wix-site)
- [Set up a headless client](https://dev.wix.com/docs/go-headless/authentication/setup/set-up-a-headless-client)
- [About authentication](https://dev.wix.com/docs/go-headless/authentication/about-authentication)
- [Authenticate visitors with REST](https://dev.wix.com/docs/go-headless/authentication/visitors/authenticate-visitors-rest)
- [Create a JavaScript SDK client with OAuth](https://dev.wix.com/docs/go-headless/develop-your-project/authentication/oauth/create-a-client-for-authentication-with-oauth)
- [Configure app permissions](https://dev.wix.com/docs/build-apps/develop-your-app/access/authorization/configure-permissions-for-your-app)
- [Wix Blog Posts and Stats API introduction](https://dev.wix.com/docs/api-reference/business-solutions/blog/posts-stats/introduction)
- [Query Posts](https://dev.wix.com/docs/rest/business-solutions/blog/posts-stats/query-posts)
- [Get Post By Slug](https://dev.wix.com/docs/api-reference/business-solutions/blog/posts-stats/get-post-by-slug)
- [Wix Blog Post object](https://dev.wix.com/docs/rest/business-solutions/blog/posts-stats/post-object)
- [Wix Blog Draft Posts API introduction](https://dev.wix.com/docs/api-reference/business-solutions/blog/draft-posts/introduction)
- [Create Draft Post authentication and permissions](https://dev.wix.com/docs/api-reference/business-solutions/blog/draft-posts/create-draft-post)
- [Wix Blog RSS limitations](https://support.wix.com/en/article/wix-blog-adding-an-rss-button-to-your-site)

### Netlify

- [Functions overview](https://docs.netlify.com/build/functions/overview/)
- [Caching overview](https://docs.netlify.com/build/caching/caching-overview/)
- [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/)
- [Environment variables overview](https://docs.netlify.com/build/environment-variables/overview/)
- [Environment variables and serverless functions](https://docs.netlify.com/build/functions/environment-variables/)
- [Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)
