import { query } from './_generated/server';
import { components } from './_generated/api';
import { DataModel } from './_generated/dataModel';
import { betterAuth } from 'better-auth';
import { createClient, type GenericCtx } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import authConfig from './auth.config';

declare const process: {
  env: Record<string, string | undefined>;
};

const siteURL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_CONVEX_SITE_URL ??
  'http://localhost:3000';

const trustedOrigins = [
  siteURL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3002',
].filter(Boolean);

// The component client has methods needed for integrating Convex with Better Auth.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth({
        baseURL: siteURL,
        trustedOrigins,
        cors: {
            enabled: true,
            origin: trustedOrigins,
            methods: ['GET', 'POST', 'OPTIONS'],
            allowHeaders: ['content-type', 'authorization'],
        },
        database: authComponent.adapter(ctx),
        emailAndPassword: {
            enabled: true,
            requireEmailVerification: false,
        },
        plugins: [
            // FIXED: Pass options object to convex plugin as required in v0.10+
            convex({ 
                authConfig,
                // Instructs Convex to rotate tokens cleanly to prevent algorithm mismatch errors
                jwksRotateOnTokenGenerationError: true 
            }),
        ],
    });
};

// Example function for getting the current user
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        return authComponent.getAuthUser(ctx);
    },
});
