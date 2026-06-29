import type { AuthConfig } from 'convex/server';

const siteURL = process.env.CONVEX_SITE_URL ?? process.env.SITE_URL ?? 'http://localhost:3000';
process.env.CONVEX_SITE_URL ||= siteURL;

const authConfig = {
  providers: [
    {
      domain: siteURL,
      applicationID: 'convex',
    },
  ],
} satisfies AuthConfig;

export default authConfig;