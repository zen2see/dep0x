// lib/auth.ts (Server-side utilities)
import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://amicable-donkey-507.convex.cloud";
const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? convexUrl;

export const {
    handler,
    preloadAuthQuery,
    isAuthenticated,
    getToken,
    fetchAuthQuery,
    fetchAuthMutation,
    fetchAuthAction,
} = convexBetterAuthNextJs({
    convexUrl,
    convexSiteUrl,
});
