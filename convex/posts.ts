import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

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