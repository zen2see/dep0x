import { query } from './_generated/server';
import { components } from './_generated/api';
import { DataModel } from './_generated/dataModel';
import { betterAuth } from 'better-auth';
import { createClient, type GenericCtx } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import authConfig from './auth.config';

const siteURL = process.env.SITE_URL ?? process.env.CONVEX_SITE_URL ?? 'http://localhost:3000';

// The component client has methods needed for integrating Convex with Better Auth.
export const authComponent = createClient<DataModel>(components.betterAuth);
export const createAuth = (ctx: GenericCtx<DataModel>) => {
    const auth = betterAuth({
        baseURL: siteURL,
        database: authComponent.adapter(ctx),
        emailAndPassword: {
            enabled: true,
            requireEmailVerification: false,
        },
        plugins: [
            convex({ authConfig }),
        ],
    });

    return auth as any;
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        return authComponent.getAuthUser(ctx);
    },
}); 