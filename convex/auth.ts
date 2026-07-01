import { query } from './_generated/server';
import { components } from './_generated/api';
import { DataModel } from './_generated/dataModel';
import { betterAuth } from 'better-auth';
import { createClient, type GenericCtx } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import authConfig from './auth.config';

const siteURL = 
  process.env.NEXT_PUBLIC_SITE_URL ?? 
  process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? 
  'http://localhost:3000';

// The component client has methods needed for integrating Convex with Better Auth.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth({
        baseURL: siteURL,
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
