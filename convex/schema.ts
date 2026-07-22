import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    posts: defineTable({
        title: v.string(),
        body: v.string(),
        authorId: v.string(),
        // horId: v.id("user"), // Connects posts directly to their creator
        imageStorageId: v.optional(v.id("_storage")),
    }),
    comments: defineTable({
      postId: v.id("posts"),
      authorId: v.string(),
      authorName: v.string(),
      body: v.string()
    }),

// Table to handle user registration data
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(), // Matches external auth identifiers (like Clerk/Auth0)
  }).index("by_token", ["tokenIdentifier"]), // Speeds up user lookup queries
})  