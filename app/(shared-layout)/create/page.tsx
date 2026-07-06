"use client"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { postSchema } from "@/app/schemas/blog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"; // 👈 Added missing hook import
import { z } from "zod"; // 👈 Added missing zod import

type PostFormValues = z.infer<typeof postSchema>; // 👈 Extracted clean type helper

export default function CreateRoute() {
  const mutation = useMutation(api.posts.createPosts)
  
  const form = useForm<PostFormValues>({ // 👈 Added explicit type generic
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 👈 Added async/await to handle the database insertion lifecycle safely
  async function onSubmit(values: PostFormValues) {
    try {
      await mutation({
        title: values.title,
        body: values.content, // Make sure your Convex schema expects 'body' and not 'content'
      });
      form.reset(); // Clear the form after a successful post
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl"> {/* 👈 Fixed tracking-tigt typo */}
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader> 
        <CardContent>
          {/* 👈 Hooked up the onSubmit handler to react-hook-form */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input 
                      aria-invalid={fieldState.invalid}
                      placeholder="super cool title" 
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="super cool blog content" 
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* 👈 Added dynamic button states for safety during submission */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Post"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
