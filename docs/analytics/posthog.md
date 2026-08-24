# PostHog production setup

Leadership Learners uses its own PostHog project. Analytics only initializes when all of the following are true:

- Vite is building for production.
- `VITE_POSTHOG_ENABLED` is exactly `true`.
- The project token, ingestion host, and allowed hostname are present.
- The browser hostname exactly matches `VITE_POSTHOG_ALLOWED_HOST`.

## Required production environment variables

- `VITE_POSTHOG_ENABLED`
- `VITE_POSTHOG_PROJECT_TOKEN`
- `VITE_POSTHOG_HOST`
- `VITE_POSTHOG_ALLOWED_HOST`

Store the values in the Netlify production environment. Do not commit project-specific values to the repository.

## Session replay privacy

Session Replay is enabled for the dedicated Leadership Learners project with these protections:

- Total-privacy masking is selected in PostHog project settings.
- All page text, inputs, element attributes, images, video, canvas, and iframes are masked or blocked by the client as a local fallback.
- Console-log capture is disabled.
- Network timing may be captured, but request and response headers and bodies are disabled.
- Autocapture, person profiles, persistent identifiers, surveys, heatmaps, exceptions, and performance capture remain disabled.

These settings make recordings useful for reviewing page flow, clicks, scrolling, and layout behavior without retaining visitor-entered text or readable page content.

## Deployment boundary

Deploy previews, branch deploys, local development, and unexpected hostnames do not initialize PostHog. When the production hostname changes, update `VITE_POSTHOG_ALLOWED_HOST` before expecting analytics or recordings on the new domain.

Reference: [PostHog Session Replay privacy controls](https://posthog.com/docs/session-replay/privacy)
