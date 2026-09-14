# Wix Blog integration feasibility decision

- **Decision:** Conditional GO
- **Status:** Full-article direction confirmed by Thomas; implementation remains conditional on API access, content validation, and release gates below
- **Audience:** Shepard and Team Normandy
- **Updated:** 2026-09-14
- **Scope:** Use Tammy's existing Wix Blog as the publishing backend; serve the blog listing and complete articles on the new Netlify website, preserving existing article URLs

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
Netlify blog listing + complete article pages
```

The conditional GO becomes implementation-ready when all of the following are true:

1. Match the confirmed public blog and sample posts below to the correct Wix dashboard site/project ID.
2. A Wix headless OAuth client can make anonymous visitor calls with only the `Read Blog` permission.
3. Inspect the published API payloads for the two supplied posts, including their media, categories, links, and rich-content blocks. Public-page inspection is complete; API inspection is not.
4. Choose and review the full-article rendering, HTML delivery, metadata, and status-code strategy before implementation. Verify the release gates below before cutover. The teaser-and-link-to-Wix option is no longer selected.
5. Thomas confirms that the target Netlify project can run Functions and use the selected persistent-cache facility.

This documentation update does not authorize code, package, account, domain, DNS, publishing, or credential changes. Thomas intends to point the current public domain to the new Netlify website when the integration is ready. Prepare and test the integration first; the domain cutover is a separate, explicitly authorized release step. Do not transfer ownership, change DNS, unpublish the Wix site, or cancel its plan as part of this spike.

## Confirmed project direction and content samples

Thomas confirmed the following on 2026-09-14:

- Tammy will continue writing and publishing in her Wix dashboard. The same Wix site/project remains the content source.
- The new Netlify website will display complete articles, not send readers to separate Wix article pages.
- Current public blog: <https://www.leadershiplearners.com/blog>.
- Keep `/blog` for the article listing and `/post/<slug>` for article pages. Do not change existing article slugs or move them to `/blog/<slug>` just for consistency with the temporary React routes.
- Keeping the same public host and paths means no article-path redirects are needed merely because hosting changes. The new site must actually resolve these paths; DNS alone does not implement article pages.
- Wix stores the content; our frontend constructs its public article links from the production origin and validated slugs. A separate publicly browsable Wix article URL is not required for this selected experience. Wix API authentication uses the project/headless client, not the public website domain.
- The temporary repository blogs can remain during development until the real integration replaces them. They must never become outage fallback content for the live integration.
- Preserve the newer website work in PR #7. This spike adds the integration plan, not a rollback to earlier site code.

Published samples supplied by Thomas:

| Article | Existing path | Public-page observations |
| --- | --- | --- |
| [More people should see the world through Austin's eyes](https://www.leadershiplearners.com/post/more-people-should-see-the-world-through-austin-s-eyes) | `/post/more-people-should-see-the-world-through-austin-s-eyes` | Short paragraphs, several images, author/date/reading-time display, and a button linking to Facebook. Preserve that external action as a link; do not assume an embedded video. |
| [From Silence to Stage: The Inspiring Journey of 14-Year-Old Austin Morales](https://www.leadershiplearners.com/post/from-silence-to-stage-the-inspiring-journey-of-14-year-old-austin-morales) | `/post/from-silence-to-stage-the-inspiring-journey-of-14-year-old-austin-morales` | Article image, section headings, paragraphs, author/date/reading-time display, tags, and the Autism awareness category. |

These observations establish the minimum rendering test corpus, not the Wix API schema. Confirm actual block types, image descriptions, full publication timestamps, and byline fields from API responses; do not infer missing values from the abbreviated public date display. Public pages also show Wix comments/search UI. Recreating comments, member login, site search, or other Wix widgets is not automatically included in this published-article integration and needs a separate product decision.

## Current repository content flow

This documentation branch contains an older website snapshot. Implement against the accepted PR #7 website baseline on a new feature branch, preserving its design, accessibility, contact flow, and analytics. Do not copy this spike's older application files over PR #7.

In the PR #7 baseline:

- `src/lib/blog-data.ts` exports three hard-coded placeholder posts.
- `src/types/blog.ts` defines a local `BlogPost` interface.
- `src/pages/Blog.tsx` imports that array and renders the `/blog` cards.
- `src/pages/BlogPost.tsx` imports the same array, resolves `/blog/:slug`, and renders placeholder body copy.
- `src/App.tsx` registers `/blog` and `/blog/:slug` with React Router.
- `netlify.toml` sends unmatched paths to `index.html`, so these routes are client-rendered SPA routes.
- `src/components/seo/RouteSeo.tsx`, `src/lib/seo.ts`, and `src/lib/site-config.ts` already supply client-side route metadata, social tags, and article structured data. `index.html` supplies static homepage defaults. This is not yet verified article-specific server-rendered HTML for each direct article request.
- `scripts/generate-sitemap.mjs` duplicates the temporary post list; replace that list with the same validated real-content source used for articles rather than maintaining a separate list of mock slugs.
- PR #7 pre-wires the non-www origin `https://leadershiplearners.com`, while the supplied current URLs use `https://www.leadershiplearners.com`. Reconcile canonical-host configuration before cutover; do not silently change the supplied public host or treat this as a reason to change article paths.
- `public/robots.txt` blocks crawling until launch in PR #7. The existing Wix website is already public; its launch status must not be inferred from those older new-site comments. Enabling production crawling is an explicit release decision.
- `scripts/write-staging-headers.mjs` writes `X-Robots-Tag: noindex, nofollow` for Netlify Deploy Previews and the `staging` branch deploy.

The three repository posts and their body text are placeholders, not an approved content backup. **Placeholder repository blog posts must never be fallback content.** When the CMS and all approved caches are unavailable, the UI must show an explicit unavailable/empty state rather than silently displaying those records.

## Options considered

| Option | Decision | Reason |
| --- | --- | --- |
| Keep repository posts as the CMS | Reject | Requires developer deployments for editorial changes and the existing records are placeholders. |
| Link directly to Wix without a feed | Not selected | Thomas wants complete articles on the new website; a separate public Wix article destination is not assumed after cutover. |
| Fetch Wix directly from React | Reject | Couples presentation code to Wix authentication, response shapes, errors, and API changes; it also weakens server-side cache and observability control. |
| Consume Wix RSS | Not selected for the article source | The 20-recent-post limit and lack of category feeds do not provide the complete, validated rich-content archive required here. |
| Use Wix Blog through a Netlify Function adapter | Select | Keeps Wix and token handling behind one boundary, permits schema validation and caching, and gives React a stable site-owned contract. |
| Copy or synchronize full posts into the repository | Reject as the editorial source | Creates a second source of truth and an editorial reconciliation problem. Generated HTML/cache artifacts are delivery outputs, not separately edited source content. |
| Render complete Wix posts on Netlify | Select, with release gates | Preserve `/post/<slug>` and validate rich-content rendering, safe links/media, crawlable metadata, status codes, and content refresh before domain cutover. |

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

### Initial delivery: complete articles on Netlify

Replace the placeholder cards on `/blog` with normalized summaries of published Wix posts. Each card links to the same site's `/post/<slug>`. Fetch detail content through the server-owned adapter and render it using validated, site-owned content blocks in the new site's design. Preserve editorial text, headings, images, links/buttons, publication dates, and available tags/categories; do not rewrite Tammy's posts during migration.

Keep existing article slugs and `/post/<slug>` paths. Inventory every published article, not just these two samples. Unknown or removed posts must show the site's NotFound experience with HTTP `404` and `noindex`, rather than redirecting to the listing or an unrelated article. Remove temporary detail links when the real content integration is activated; mock slugs are not mappings to real Wix posts.

Tammy retains one editorial source of truth in Wix. Netlify owns the public article rendering and SEO. A custom content renderer and article-specific HTML delivery are required; simply repointing DNS or adding client-side metadata does not complete this work.

### Article rendering and delivery boundaries

- Define a supported-block matrix from the real Wix rich-content payloads before choosing a renderer. At minimum, validate paragraphs, section headings, individual/multiple images, and the Facebook link/button in the supplied samples. Support additional blocks only when they occur in the audited corpus.
- Map Wix content to site-owned typed blocks at the adapter boundary. Render text through React escaping and validate link/media protocols and origins. Do not insert unsanitized Wix HTML, arbitrary scripts, or iframe markup into the page.
- Preserve supplied image alt text and dimensions where available. Flag missing editorial descriptions for review instead of inventing them. Validate accessibility and responsive behavior, including wide media and long titles.
- Unsupported meaningful blocks are a release blocker for the affected article. Do not silently drop them or link readers back to a Wix page that will no longer be their public article home. Add tested support or obtain an explicit editorial decision.
- Choose a minimal server-rendered or pre-rendered article delivery strategy compatible with the accepted site. Direct requests to `/post/<slug>` must receive article body, title, description, canonical, social metadata, and structured data without relying solely on browser JavaScript.
- A pre-rendered/static strategy must include an approved automated rebuild/revalidation mechanism when Tammy publishes, edits, or removes a post. A dynamic strategy must refresh article HTML and content caches together. No routine developer commit should be required for an editorial update.
- Keep one accepted article data source for HTML delivery, client navigation, and sitemap generation. Do not add a second independent fetch/token implementation or duplicate slug lists.

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
  canonicalUrl: string      // site-owned production origin + /post/<validated slug>
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
    source: 'wix-api' | 'last-known-good'
  }
}
```

Contract rules:

- List queries omit rich content for smaller responses. Detail queries use Get Post By Slug with the documented rich-content fieldset; verify its exact SDK shape during the API audit rather than assuming it from public HTML.
- Use `firstPublishedDate` for the original publication date. Preserve the validated slug and construct the public canonical URL under the new site; do not send visitors to the Wix-provided post URL after cutover.
- Resolve category IDs through the Wix Blog category API and cache the map. Do not guess labels from IDs.
- A post exposes an owner/member ID, not necessarily a display-ready author. Keep `byline` nullable initially rather than adding Members permission or inventing an author. Resolve any missing byline with editorial review before release.
- Validate image URLs and dimensions; provide an accessible UI fallback when image data is absent. Never invent alt text from unavailable source data without editorial approval.
- Reject malformed required fields at the adapter boundary. Do not pass partially trusted Wix payloads directly to components.
- `SiteContentBlock` must be defined from an audit of Tammy's real posts. Unsupported Wix/Ricos block types must be surfaced during validation and resolved before publishing the affected article, not discarded silently.

## Caching and outage behavior

Netlify does not cache Function responses by default. The implementation should use two layers:

1. **Response cache:** Return a `Netlify-CDN-Cache-Control` policy with `public`, `durable`, a short shared freshness period (starting recommendation: five minutes), and `stale-while-revalidate` (starting recommendation: one hour). Keep browser caching shorter so fixes can propagate. Confirm final values with Tammy's expected publishing urgency.
2. **Last-known-good store:** In production, after schema validation, persist normalized summary/detail records and `fetchedAt` metadata in a versioned, site-wide Netlify Blobs keyspace so a new production deploy can retain the previous good data. Do not overwrite a good record with a timeout, authentication error, rate-limit response, malformed payload, or empty result that has not passed an explicit empty-blog check. Deploy Previews must use a deploy-specific store or no persistent store and must never write the production last-known-good namespace.

On Wix timeout, `401`, `429`, `5xx`, or invalid data:

- Serve the last-known-good normalized response when it is within the agreed maximum staleness window (starting recommendation: seven days).
- Mark `meta.stale: true`, set `source: 'last-known-good'`, emit a short cache lifetime, and record a sanitized operational event.
- If no approved last-known-good value exists, return `503` with a stable machine-readable error. The public article response also returns HTTP `503` for a source outage, distinct from a confirmed missing post's `404`. Show a neutral unavailable message and safe links to the site's listing/contact page, not a presumed separate Wix blog.
- A confirmed unpublished/deleted post must invalidate its cached detail, generated HTML, and sitemap entry. Last-known-good data must not knowingly resurrect removed or restricted content; verify visibility and purge behavior before launch.
- Never cache credentials, raw exception objects, or an error response as successful content.
- Never fall back to `src/lib/blog-data.ts` or any other placeholder repository content.

RSS is not part of this selected full-article implementation. Wix documents a feed limited to 20 recent posts and no category feeds; it is not an equivalent archive/detail source. Do not quietly introduce RSS or link-to-Wix fallback behavior without a separate product decision.

## Editorial and preview workflow

1. Tammy writes, previews, schedules, and publishes in Wix Blog using Wix's native editorial interface and roles.
2. Draft review remains in Wix's preview experience. Publishing is the explicit handoff to the Netlify read path.
3. Netlify production and Deploy Previews query only Wix's published Posts API or an approved published-only cache.
4. A Netlify Deploy Preview verifies UI and adapter behavior against published content; it is not a draft-CMS preview.
5. The existing repository build step keeps Deploy Previews and the `staging` branch deploy under `X-Robots-Tag: noindex, nofollow`.

**Draft/admin credentials must not enter Deploy Previews.** Do not set a Wix API key, client secret, Wix user token, `Manage Blog` credential, or draft-reading credential in the Deploy Previews context. Do not call Draft Posts APIs from preview functions. If published-only visitor configuration is intentionally unavailable in a preview, use an explicit unavailable state. Test fixtures must be clearly isolated from the live data path; they are not outage fallback posts.

## Collaborator access and headless setup

Human dashboard access and runtime API access are separate. Thomas can use his own Wix account; Tammy invites him to the correct site as a collaborator, retains ownership, and can revoke access. No shared password or special Partner account is required.

### Tammy: grant the integration setup role

1. Open the correct site's dashboard and go to **Settings > Roles & Permissions**.
2. Choose **Manage Roles > Create a New Role**, with a title such as **Blog Integration Developer**.
3. Under **Site Dashboard**, select **Manage headless settings**, then save. Wix's standard collaborator roles do not automatically include Headless Settings access.
4. Invite Thomas's own Wix-account email as a collaborator and assign that custom role. Existing collaborators can be assigned the role instead. Invitation button wording may be **Invite People** or **Invite Collaborators** depending on the dashboard.
5. Add blog-management permissions only if Thomas will also manage or edit posts. Do not grant billing, payment, ownership, or domain-management access just to build this API connection. Manage headless settings is a configuration-management permission, not a read-only Blog role; grant it intentionally and review/revoke it when setup is finished.

If the dashboard does not expose this permission or Headless Settings for the current site, capture the actual available settings and resolve access with Tammy. Do not default to Co-Owner or an admin credential as a workaround.

### Thomas: register and validate the runtime client

1. Accept the invitation using your own Wix account and verify the selected dashboard site matches the supplied blog and both posts. Record the project/site ID in approved configuration, not just its display name.
2. Go to **Settings > Development & integrations > Headless Settings**. Create or identify the headless client for this external website; name it clearly, for example **Leadership Learners Netlify Blog**. Select the appropriate external client type and JavaScript stack offered by the dashboard.
3. Retrieve its client ID. Keep proposed function configuration in `WIX_HEADLESS_CLIENT_ID`, a project convention to implement later, not an environment variable already supported by this spike. Use an ignored local configuration file and Netlify-managed context-specific variables; do not commit tokens or put them in `VITE_*` variables. The client ID is public, but server-owned configuration keeps the adapter boundary clear.
4. Validate published Blog Query Posts and Get Post By Slug using anonymous visitor OAuth and the documented `Read Blog` access requirements. Do not conflate collaborator roles with API permissions, or assume a dashboard permission toggle guarantees an API call. Confirm the actual identity/access behavior on Tammy's site and prove drafts/restricted content remain inaccessible.
5. Save sanitized payload fixtures for both samples, including rich content, and compare them with their public pages. Public-page review alone does not prove API access or block-rendering support.
6. No client secret is needed for visitor OAuth. No member login, checkout, or browser authorization redirect flow is selected, so do not introduce login/checkout redirect settings merely to read public posts. If access fails, return sanitized evidence instead of elevating to admin access.
7. Validate locally and on protected Netlify previews while Wix still serves the current public website. The API connection can be prepared before moving the domain.

This file records setup instructions only: no invitation, client, credential, Function, or account setting has been created by this documentation change.

## SEO and canonical constraints

- Netlify owns the public listing and complete article HTML, metadata, canonical URLs, and sitemap. Wix is the publishing backend, not an assumed second public article destination.
- Preserve the current `/post/<slug>` URLs. Inventory all published slugs and internal article links before cutover; do not assume the two samples are the entire archive.
- Configure one production canonical origin consistently across static HTML, route metadata, article structured data, sitemap, internal links, and host behavior. Preserve the supplied www URLs unless a different canonical-host policy is explicitly approved; resolve PR #7's existing non-www defaults as part of release preparation.
- Build article links from the configured site origin and validated slug. Validate external links separately; do not trust arbitrary Wix-provided `url` values as our canonical destination.
- Same domain and same article path require no article-path redirect merely because hosting changes. Only an intentionally changed URL needs a separately reviewed permanent mapping. Unknown posts return `404`; source outages return `503` rather than unrelated redirects.
- Verify article-specific body, title, description, social tags, canonical, structured data, and status codes in the HTTP response without JavaScript. Client-side RouteSeo alone is not this release gate. Static generation must refresh when content changes; sitemap and page availability must stay synchronized.
- Published articles may be indexed only after production launch approval. Staging/Deploy Previews retain HTTP-level noindex protection; don't accidentally ship those headers to production or remove preview protection to test article rendering.
- Do not include unpublished, draft, scheduled-only, gated, or paid-member content in a public sitemap or article response. Confirm whether Tammy uses Wix Pricing Plans or multilingual posts before expanding scope.

## Domain cutover boundary

Build and test against the same Wix backend before switching the public host. A domain/DNS change does not migrate article data or configure API access; it only changes which host serves requests. No domain-registration transfer or separate public Wix article subdomain is inherently required by our selected frontend behavior.

Before any cutover, Thomas and Tammy must explicitly authorize the exact host/DNS changes, confirm Wix account/plan and any Wix-hosted flows still needed, inventory existing URLs beyond the blog, verify Netlify custom-domain/TLS readiness, and approve rollback. Follow Wix's applicable existing-site/headless setup for the actual account; do not assume deleting or unpublishing the old site is safe. Preserve email records (`MX`, `SPF`, `DKIM`, `DMARC`) and unrelated services. Test both supplied article URLs directly on the new deployment, then repeat after authorized cutover. This spike performs none of those external changes.

## Validation checklist for implementation

- [x] Record the current public blog URL and two published samples supplied by Thomas.
- [x] Confirm Thomas's full-article direction and preserve `/post/<slug>` instead of introducing article-path redirects.
- [ ] Match the samples to the exact Wix site ID/project and confirm the Netlify production project.
- [ ] Accept collaborator access with Manage headless settings and validate the correct headless client.
- [ ] Inspect representative published API payloads; public pages have been reviewed, but API access is not yet verified.
- [ ] Exchange the headless client ID for an anonymous visitor token without a client secret.
- [ ] Prove Query Posts and Get Post By Slug work with only `Read Blog`; prove Draft Posts access is absent.
- [ ] Compare API title, excerpt, first publication date, slug, URL, categories, media, and reading time with Wix's public pages.
- [ ] Verify complete archive pagination at the documented limit for the selected SDK/API version, not just the first page or two samples.
- [ ] Validate DTO parsing for missing excerpts/media/bylines, Unicode, long titles, changed slugs, and unsupported rich-content blocks.
- [ ] Confirm React imports no Wix SDK or Wix response types outside the adapter boundary.
- [ ] Confirm the browser receives no Wix access token, refresh token, secret, API key, or raw Wix error.
- [ ] Check `Cache-Status`/response metadata for fresh, durable, revalidated, and last-known-good paths.
- [ ] Simulate timeout, `401`, `429`, `5xx`, malformed JSON, empty results, and missing cache; verify stale or explicit `503` behavior.
- [ ] Verify placeholders never render when Wix and caches are unavailable.
- [ ] Verify `/blog` cards link to local `/post/<slug>` pages, both supplied URLs retain their slugs, and unknown posts return HTTP `404` without misredirecting.
- [ ] Compare all audited blocks and media visually; confirm the Facebook button remains a safe external link and unsupported blocks cannot disappear silently.
- [ ] Verify article HTML/body/metadata and true `404`/`503` status responses with JavaScript disabled.
- [ ] Publish/edit/unpublish a controlled test post in an approved test context; verify HTML, client content, and sitemap refresh/invalidation together without a developer commit.
- [ ] Ensure known deleted/restricted posts cannot be resurrected by stale caches.
- [ ] Verify Deploy Previews contain no draft/admin credentials, return only published content, and retain `noindex, nofollow` headers.
- [ ] Reconcile www/non-www canonical configuration and retain preview indexing protection before any separately authorized launch/cutover.
- [ ] Run repository lint and build after implementation, then test responsive, keyboard, screen-reader, and empty/error states.

## Risks and mitigations

| Risk | Mitigation / gate |
| --- | --- |
| Required Wix access is not available | Keep full-article delivery conditional; report the access failure. Do not invent credentials or substitute the rejected teaser/link-to-Wix experience. |
| Wix schema or SDK changes | Pin reviewed package versions during implementation, validate at the adapter, version the DTO/cache keys, and monitor sanitized errors. |
| Stale content after publishing | Start with five-minute shared freshness, one-hour SWR, expose `fetchedAt`, and define an owner-operated cache purge/revalidation procedure. |
| Wix outage or rate limiting | Durable CDN cache, bounded last-known-good Blobs data, request timeouts, limited retries with jitter, and a clear unavailable state. |
| Cache contamination across deploy contexts | Netlify documents site-wide Blobs as shared by all deploys and warns that branch deploys can affect production data. Production alone may write the site-wide last-known-good store; previews use deploy-specific/no persistence. For untrusted pull requests, disable Function/Blobs access or use a separate Netlify project because code-level namespacing is not a security boundary. |
| Draft or privileged data leakage | Use visitor OAuth + `Read Blog`; do not provision draft/admin credentials to Deploy Previews or public frontend code. |
| Incorrect article URLs or duplicate-content SEO | Preserve `/post/<slug>`, agree one canonical production host, and deliver matching article-specific HTML/metadata on Netlify. Do not assume a separate public Wix article copy. |
| Rich-content incompatibility | Audit all meaningful real blocks, validate the renderer, and block release of affected articles until support or an explicit editorial decision exists. |
| Stale static HTML or resurrected removed posts | Couple publish/edit/unpublish refresh and invalidation across HTML, API caches, and sitemap; test it before cutover. |
| Premature domain cutover | Require explicit release approval, direct article tests, TLS readiness, email-record preservation, and a rollback plan. |
| Author/category enrichment expands permissions | Keep byline nullable; use Blog category endpoints under `Read Blog`; require a new least-privilege review before adding Members access. |

## Concrete implementation sequence

1. Start from the accepted PR #7 website on a reviewable feature branch. Retain its newer work; this documentation branch is not the implementation baseline. Match the confirmed URLs to Tammy's Wix project and resolve remaining access/operational decisions below.
2. Tammy grants Thomas the custom collaborator setup role; Thomas creates/confirms one website headless client and verifies only published Blog reads with anonymous visitor OAuth and the documented `Read Blog` requirements. Make no domain changes.
3. Capture sanitized published API payloads for the two supplied samples and audit the rest of the archive. Finalize runtime validators, summary/detail contracts, supported content blocks, safe-media rules, and versioned cache keys.
4. Add one Wix adapter used only by Netlify Functions. It owns SDK setup, anonymous token handling, timeouts, pagination, category mapping, URL allowlisting, DTO normalization, and sanitized errors.
5. Add published summary/list and slug-detail endpoints, Netlify durable response caching, and versioned last-known-good persistence with deletion/visibility invalidation. Keep one adapter/data contract for all consumers.
6. Replace mock content with real `/blog` cards and complete `/post/<slug>` article pages, preserving the audited formatting, images, tags, and safe links. Remove temporary mock article links when enabling the integration; do not redirect real visitors to unrelated posts.
7. Configure production and preview contexts so Functions receive only the published-read configuration intended for that context. Verify no draft/admin credential is present in Deploy Previews.
8. Implement and verify article-specific server-rendered or pre-rendered HTML, metadata, social tags, status codes, and sitemap from the same validated content source. Automate refresh/invalidation for editorial changes and reconcile production canonical-host configuration.
9. Execute the validation checklist, including visual/block, accessibility, no-JavaScript, archive, outage, and publish/edit/unpublish tests. Obtain release-readiness review; no domain changes are implied by passing tests.
10. Separately obtain domain-cutover approval, preserve unrelated DNS/email services, verify custom-domain/TLS and existing URL coverage, and execute the documented rollback-ready release. Recheck existing `/post/<slug>` links after cutover.

## Decisions and access needed from Tammy and Thomas

### Tammy

- Confirm which Wix account/site/project owns the supplied public blog and posts; provide authorized collaborator access, not shared login credentials.
- Confirm Wix remains the editorial source of truth. Thomas has selected full articles on the new site, preserving `/post/<slug>`; no teaser-link-to-Wix approval is outstanding.
- Confirm whether posts use categories, authors, scheduled publishing, Wix Multilingual, paid/member-only content, embeds, galleries, video/audio, or other rich blocks.
- Two representative published post URLs are already supplied above. Provide additional examples only if the archive uses rich blocks not represented by these samples.
- Authorize a least-privilege headless client for published Blog reads. Share the client ID through the agreed configuration channel; do not share a Wix password or admin token.
- Confirm acceptable content freshness and maximum last-known-good age.

### Thomas

- Confirm the production Netlify project/site URL and who can set context-specific Function environment variables.
- Confirm Functions and Netlify Blobs are acceptable for the target plan and operating cost.
- Set the Wix client ID as Netlify-managed Function configuration after Wix validation; do not commit it to the repository. A visitor client ID is not a client secret, but keeping it at the adapter boundary preserves configuration control.
- Confirm whether Deploy Previews may read the same published Wix content or must run in unavailable mode.
- Confirm the production canonical host, approved link/media origins, and operator/alert destination for integration failures. Preserve current public URLs; do not silently change www to non-www or vice versa.
- Choose the article HTML delivery and automated content-refresh strategy before implementation; confirm whether recreating Wix comments/search is out of scope.
- Coordinate domain cutover as a separately approved release only after the full-article implementation is verified. Do not request broad domain/billing access merely for API development.
- Approve the initial cache targets (five minutes fresh, one hour SWR, seven days maximum last-known-good) or provide alternatives.

No client secret, API key, Wix login, draft token, or admin credential is needed for the selected published-content path. If testing shows visitor OAuth plus `Read Blog` is insufficient on Tammy's site, stop and return sanitized evidence for owner review; do not escalate permissions speculatively.

## Official sources

Original architecture sources were reviewed on **2026-08-24**. Collaborator access, headless-client setup, authentication, and existing-site/domain-separation guidance were rechecked on **2026-09-14**. Reverify the exact Blog SDK method/fieldset and permissions during the real API audit; this update has not authenticated to Wix or inspected API payloads.

### Wix

- [About self-managed headless](https://dev.wix.com/docs/go-headless/self-managed-headless/about-self-managed-headless)
- [About existing Wix site migration to self-managed headless](https://dev.wix.com/docs/go-headless/self-managed-headless/get-started/migrate-from-an-existing-wix-site/about-wix-site-migration-to-a-headless-project)
- [Invite collaborators and grant Manage headless settings](https://dev.wix.com/docs/go-headless/project-management/invite-collaborators)
- [Invite site collaborators using their own accounts](https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site)
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
