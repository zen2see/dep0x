import { NextResponse, NextRequest } from "next/server";
import { fetchMutation } from "convex/nextjs"; // Use native Convex Next.js execution helper
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth"; // Import your auth token extractor helper

export async function POST(request: NextRequest) {
  try {
     // 1. Correctly extract the token string using the context wrapper
    const token = await getToken(); 

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Missing authentication session token." },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image") as File | null;

    if (typeof title !== "string" || typeof content !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing title or content" },
        { status: 400 },
      );
    }

    let storageId: Id<"_storage"> | undefined;

    if (imageFile && imageFile.size > 0) {
      // 2. Safely apply token credentials to retrieve upload link
      // Pass token explicitly inside the 3rd argument options object
      const uploadUrl = await fetchMutation(
        api.posts.generateImageUploadUrl, 
        {}, 
        { token } 
      );
      
      const uploadResult = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": imageFile.type },
        body: imageFile,
      });

      if (!uploadResult.ok) {
        return NextResponse.json(
          { success: false, error: "Failed to upload file to storage" },
          { status: 500 },
        );
      }

      const data = await uploadResult.json();
      storageId = data.storageId as Id<"_storage">;
    }

    const post = await fetchMutation(
      api.posts.createPost, 
      {
        title,
        body: content,
        imageStorageId: storageId,
      },
      { token } // Authenticates your mutation execution perfectly
    );

    return NextResponse.json({ success: true, post });

  } catch (error) {
    console.error("Route handler upload error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
