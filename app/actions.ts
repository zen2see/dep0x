"use server"

import { postSchema } from "@schemas/blog";
import z from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@lib/auth";
// 1. IMPORT THE ID TYPE FROM CONVEX
import { Id } from "@convex/_generated/dataModel";

// type PostFormValues = z.infer<typeof postSchema>;

// export async function CreateBlogAction(values: PostFormValues) {
//   // 1. Fail early if validation fails
//   const parsed = postSchema.safeParse(values);
//   if (!parsed.success) {
//     return { error: "Invalid form data fields provided." };
//   }
  export async function CreateBlogAction(formData: FormData) {
  // Extract values from FormData
  const rawValues = {
    title: formData.get("title"),
    content: formData.get("content"),
    image: formData.get("image"), // This will now correctly be a File object
  };

 // 1.Safely parse with your Zod schema  Fail early if validation fails
  const parsed = postSchema.safeParse(rawValues);
  if (!parsed.success) {
    return { error: "Invalid form data fields provided." };
  }

  try {
    const token = await getToken();
     let storageId: Id<"_storage"> | undefined;

    // 2. Handle image upload URL from Convex if a file exists
    if (parsed.data.image  && parsed.data.image.size > 0) {
      const file = parsed.data.image; // Type: File
      const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, { token });
       // Upload the raw binary stream
      const uploadResult = await fetch(imageUrl, {
        method: "POST",
        // headers: { "Content-Type": parsed.data.image.type },
        // body: parsed.data.image,
        headers: { "Content-Type": file.type },
        body: file, // Works perfectly now because it's a real File instance
      });

      if (!uploadResult.ok) {
        return { error: "Failed to upload image to storage provider." };
      }

      const data = await uploadResult.json();
      storageId = data.storageId as Id<"_storage">;
    }

    // 3. Create the post (Passing storageId if it exists)
    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: storageId, // <- Ensure your mutation accepts this!
      },
      { token }
    );

  } catch (error) {
    // 4. Log the real issue for debugging, but don't leak details to client
    console.error("Blog creation failed:", error);
    return { error: "An unexpected error occurred while creating your post." };
  }

  // 5. Next.js redirects MUST happen outside the try/catch block
  redirect("/blog");
}
