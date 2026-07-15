import { NextResponse } from "next/server";
import { fetchAuthMutation } from "@/lib/auth";
import { api } from "@/convex/_generated/api";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content } = body;

  if (typeof title !== "string" || typeof content !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing title or content" },
      { status: 400 },
    );
  }

  try {
    const post = await fetchAuthMutation(api.posts.createPost, {
      title,
      body: content,
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}