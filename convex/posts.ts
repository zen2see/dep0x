import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const searchPosts = query({
    args: {
        term: v.string(),
        limit: v.number(),
    },
    handler: async (ctx, args) => {
        const normalizedTerm = args.term.trim().toLowerCase();
        if (!normalizedTerm) {
            return [];
        }

        const posts = await ctx.db.query("posts").collect();

        return posts
            .filter((post) => {
                const searchableText = `${post.title} ${post.body}`.toLowerCase();
                return searchableText.includes(normalizedTerm);
            })
            .slice(0, args.limit)
            .map((post) => ({
                _id: post._id,
                title: post.title,
                body: post.body,
            }));
    },
});

// Create a new blog article with the given title and body.
export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const user = identity ? await authComponent.safeGetAuthUser(ctx) : undefined;

        if (!identity && !user) {
            throw new ConvexError("User not authenticated");
        }

        const authorId = identity?.tokenIdentifier ?? user?._id ?? "unknown";

        const blogArticle = await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId,
        });

        return blogArticle;
    },
});

export const clearPosts = mutation({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    for (const post of posts) {
      await ctx.db.delete(post._id);
    }
    return { deleted: posts.length };
  },
});

export const getPosts = query({
    args: {},
    handler: async (ctX) => {
        const posts = await ctX.db.query('posts').order('desc').collect();
        return posts;
    }
})