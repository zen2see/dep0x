import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { handler } from "@/lib/auth"; // Imports from your server file

export const dynamic = "force-dynamic"; // 👈 Prevents Next.js from breaking dynamic HTTP methods

export const { GET, POST } = handler;
