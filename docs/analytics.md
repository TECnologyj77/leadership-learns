# Analytics environment labels

`src/lib/analytics.ts` adds an `environment` property to every PostHog event. The contact dashboard shows only events with `environment=production`.

| Build            | Host                                                                                | Label         | SDK starts by default |
| ---------------- | ----------------------------------------------------------------------------------- | ------------- | --------------------- |
| Production build | `leadershiplearners.com`, `www.leadershiplearners.com`, `leadership-learners.netlify.app` | `production`  | Yes                   |
| Production build | Any other host, for example a deploy preview or `vite preview` on localhost        | `preview`     | No                    |
| Dev server       | Any host                                                                            | `development` | No                    |

`VITE_POSTHOG_ENABLED` controls only whether the SDK starts. It does not change the label.

- `true` starts the SDK on all hosts.
- `false` stops the SDK on all hosts.
- An empty value starts the SDK only when the label is `production`.

## Historical data

Commit `a71ebb6` (October 6, 2026) inverted the labels. The fix for this restores the rules above. Between the deploy of `a71ebb6` and the deploy of the fix:

- Live-site events have `environment=preview`.
- Dev-server events on localhost have `environment=production`.

These events keep their old labels. Do not compare `environment` values across this period. To read this period, filter on `$host` instead of `environment`.
