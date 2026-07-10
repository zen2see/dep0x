// convex/users.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Optional: Add authentication checks here before deleting
    await ctx.db.delete(args.userId as any);
  },
});

export const clearAllUsers = mutation({
  args: {},
  handler: async (ctx) => {
    const allUsers = await ctx.db.query("posts").collect();
    
    for (const user of allUsers) {
      await ctx.db.delete(user._id);
    }
    
    return `Successfully deleted ${allUsers.length} users.`;
  },
});