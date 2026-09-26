// Server-only Wix configuration. The headless Client ID is a public
// identifier, but it lives in Netlify-managed environment variables (and an
// ignored .env.local for development) so the Wix boundary stays in one place.
// No Client Secret, API key or admin token is used: anonymous visitor OAuth
// with the Read Blog permission is enough for published posts.

export class WixConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WixConfigError';
  }
}

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Netlify.env inside Netlify Functions; process.env in the Vite dev server,
// tests and scripts, where the Netlify global doesn't exist.
const readEnv = (name: string): string | undefined =>
  typeof Netlify !== 'undefined' ? Netlify.env.get(name) : process.env[name];

export function readWixClientId(): string {
  const clientId = readEnv('WIX_HEADLESS_CLIENT_ID')?.trim();
  if (!clientId || !GUID.test(clientId)) {
    throw new WixConfigError('WIX_HEADLESS_CLIENT_ID is missing or not a Wix client ID');
  }
  return clientId;
}
