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
    
    const filteredPosts = posts
      .filter((post) => {
        const searchableText = `${post.title} ${post.body}`.toLowerCase();
        return searchableText.includes(normalizedTerm);
      })
      .slice(0, args.limit);

    // Resolve storage images for search results as well
    return Promise.all(
      filteredPosts.map(async (post) => {
        const resolvedImageUrl = post.imageStorageId 
          ? await ctx.storage.getUrl(post.imageStorageId) 
          : null;
        return {
          _id: post._id,
          title: post.title,
          body: post.body,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});

// Create a new blog article with the given title and body.
export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.optional(v.id("_storage"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const user = identity ? await authComponent.safeGetAuthUser(ctx) : undefined;
    if (!identity || !user) {
      throw new ConvexError("User not authenticated");
    }

    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
      authorId: user?._id,
      imageStorageId: args.imageStorageId,
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
  handler: async (ctx) => {
    // 1. Fetch raw documents
    const posts = await ctx.db.query('posts').order('desc').collect();
    
    // 2. Map and return resolved assets (Removed the redundant trailing "return posts")
    return Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl = post.imageStorageId 
          ? await ctx.storage.getUrl(post.imageStorageId) 
          : null;
        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  }
});

// Step 1 to upload images
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  }
});

// Ensure this is saved inside convex/posts.ts
export const getPostById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return null;

    const imageUrl = post.imageStorageId 
      ? await ctx.storage.getUrl(post.imageStorageId) 
      : null;

    return {
      ...post,
      imageUrl,
    };
  },
});
