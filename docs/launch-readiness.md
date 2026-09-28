# Leadership Learners launch handoff

Status checked September 28, 2026. The public `leadershiplearners.com` and
`www.leadershiplearners.com` DNS records still resolve through Wix. Changing a
Netlify deploy or reviewing a Deploy Preview does not move those visitors.

## Prepared before cutover

- The launch changes are in [PR #15](https://github.com/TECnologyj77/leadership-learns/pull/15), with a [review preview](https://deploy-preview-15--leadership-learners.netlify.app/). Keep the PR reviewable; merge it to deploy the changes to the Netlify production URL before changing public DNS.
- Netlify already lists both the apex and `www` custom domains. It currently lists **the apex as primary**, which would redirect `www` to the apex after DNS changes. The site's canonical URLs use `https://www.leadershiplearners.com`, so **set `www` as primary before cutover**.
- Netlify cannot issue the custom-domain HTTPS certificate while public DNS still points to Wix. Certificate issuance and DNS propagation must be checked during cutover; the change is not literally instantaneous.
- Netlify has a DNS zone for this domain, but it contains only two website records. The authoritative name servers are still Wix. **Keep Wix name servers** for this launch and change the website records there. Switching name servers to Netlify as-is would drop the existing Google mail MX and SPF records, and may drop other records not shown in this handoff.
- Wix remains the source for the blog through the Wix Headless API. Keep that connection and its Netlify environment variable working after the website moves.

## Search migration review

The Wix sitemap inventory checked September 28, 2026 lists the home page,
`/blog`, `/about-5`, `/book-online`, five `/post/<slug>` articles, one blog
category, nine `/service-page/` URLs, and three event detail URLs. The new
site keeps the home, blog, and article paths. `netlify.toml` now permanently
redirects the old About, booking, category, and service paths to their closest
new pages. The past event pages have no matching event on the new site and
should return a real 404 rather than send visitors to an unrelated page.
All 12 redirects returned HTTP 301 on the [updated deploy](https://6abab329cda2d20008f52287--leadership-learners.netlify.app/); an unmatched event returned HTTP 404.

Before cutover, compare the Wix sitemap inventory with Search Console's
indexed pages, linked pages, and search traffic if access is available. Add
any important URL missing from the sitemap to the redirect map when it has a
relevant replacement. After cutover, verify representative redirects and
inspect the new canonical pages in Search Console. Keep the permanent
redirects in place for at least a year; indefinitely is useful for old links.

## PageSpeed and quality baseline

Run PageSpeed against an immutable [deploy permalink](https://6aba8a0d633a7000086c0d95--leadership-learners.netlify.app/) rather than a `deploy-preview-*` URL: Netlify injects its collaboration drawer into Deploy Previews, adding scripts and a third-party cookie issue that the production deploy will not have. The [mobile PageSpeed report](https://pagespeed.web.dev/analysis/https-6aba8a0d633a7000086c0d95--leadership-learners-netlify-app/dbbkdrktyu?form_factor=mobile) for this permalink scored Performance 93, Accessibility 100, Best Practices 100, SEO 69, and Agentic Browsing 3/3. LCP was 2.7 s and layout shift was 0. The [desktop report](https://pagespeed.web.dev/analysis/https-6aba8a0d633a7000086c0d95--leadership-learners-netlify-app/g4nv0y18zo?form_factor=desktop) scored 100, 100, 100, 69, and 3/3 respectively. These are simulated runs, with no real-user field data for the permalink.

The only scored SEO failure is intentional: `public/robots.txt` disallows
crawling until the public domain points to the new site. Do not remove this
guard on review builds. The accessibility report flags a missing separate
captions track as an unscored manual check; the supplied video has open captions
burned into the picture. Video playback, range requests, and keyboard play were
verified on the preview. If failures become repeatable after launch, inspect the
failing request and region first; then consider a dedicated video host or an
adaptive streaming service with a separate captions file.

A representative [blog article mobile report](https://pagespeed.web.dev/analysis/https-6abab329cda2d20008f52287--leadership-learners-netlify-app-post-mastering-disc-method-for-effective-leadership-development/lw3lie29fd?form_factor=mobile) on the updated deploy scored 98 Performance, 100 Accessibility, 100 Best Practices, 69 SEO, and 3/3 Agentic Browsing. Its only scored SEO failure was the same prelaunch crawler block. The article served its full content with one main heading, its own title and canonical URL, and BlogPosting structured data.

## Cutover sequence (requires the owner's go-ahead)

1. Finish review of PR #15 and merge it. Check the Netlify production URL for the home, corporate, individual, about, contact, blog, post, sitemap, `llms.txt`, legacy URL redirects, and real 404 pages. Check contact links and video playback. This can be done before public DNS changes.
2. In Netlify Domain management, set `www.leadershiplearners.com` as the primary domain. Confirm the apex is configured to redirect to `www`. Do this before pointing traffic to Netlify.
3. Record the current website DNS values in Wix. As checked September 28, the apex has A records `185.230.63.186`, `185.230.63.171`, and `185.230.63.107`; `www` is a CNAME to `cdn3.wixdns.net`. Preserve the MX, TXT, and all other non-website records. If Wix permits lowering the website-record TTL ahead of time, do so before the scheduled switch.
4. At the agreed time, replace only the Wix website records: make `www` a CNAME to `leadership-learners.netlify.app`; replace the apex Wix A records with Netlify's A record `75.2.60.5` (unless Netlify's domain panel gives a different site-specific target). Do **not** change name servers. Netlify's [external DNS instructions](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/) describe these record types and targets.
5. Check DNS from more than one resolver and verify that both hostnames load with valid HTTPS. Netlify should provision its certificate after DNS reaches it. Do not announce the new URL while certificate issuance is pending.
6. Once the public domain serves the new site, update `public/robots.txt` to `User-agent: *`, `Allow: /`, and `Sitemap: https://www.leadershiplearners.com/sitemap.xml`; deploy that change. Check that production has no `X-Robots-Tag: noindex` while previews retain it. Submit the sitemap in Google Search Console and inspect representative page URLs.
7. Re-run PageSpeed on the actual `www` domain for mobile and desktop. Check the video, contact methods, blog archive and posts, redirects, 404s, sitemap, analytics, and Google mail. Monitor Netlify functions and HTTPS for the first day.

## Rollback

If the site or HTTPS fails during cutover, restore the saved Wix apex A records
and `www` CNAME in Wix. The Wix name servers and mail records stay in place, so
this reverses the website routing without a name-server migration. DNS caches
may take time to update in either direction. Keep the Netlify deployment
available for diagnosis and keep its crawler block in place until launch is
complete.
