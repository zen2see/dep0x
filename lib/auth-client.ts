import { createAuthClient } from "better-auth/react"
import { convexClient } from "@convex-dev/better-auth/client/plugins";

const baseURL = typeof window !== "undefined"
  ? window.location.origin
  : (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    convexClient(),
  ],
});
