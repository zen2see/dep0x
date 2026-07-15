"use server"

import { postSchema } from "@/schemas/blog";
import z from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";


type PostFormValues = z.infer<typeof postSchema>;

export async function CreateBlogAction(values: PostFormValues) {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
        throw new Error("Something went wrong");
    }

    await fetchMutation(api.posts.createPost, {
        body: parsed.data.content,
        title: parsed.data.title,
    })

    redirect("/", "replace");

}