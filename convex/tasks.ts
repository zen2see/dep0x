import { query } from '/_generated/server';

export const getQuery = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("tasks".collect());
    }
});