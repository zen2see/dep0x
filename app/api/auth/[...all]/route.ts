import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convexSiteUrl = process.env.CONVEX_SITE_URL ?? process.env.SITE_URL;

export const { GET, POST } = convexBetterAuthNextJs({
  convexUrl: convexUrl ?? "",
  convexSiteUrl: convexSiteUrl ?? "",
});