"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { postSchema } from "@/app/schemas/blog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react"; 
import { z } from "zod";
import { useTransition } from "react";  
import { Loader2 } from "lucide-react"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

type PostFormValues = z.infer<typeof postSchema>;

export default function CreateRoute() {
  const mutation = useMutation(api.posts.createPost);
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); 

  const form = useForm<PostFormValues>({ 
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const { isSubmitting } = form.formState;
  const isLoading = isSubmitting || isPending;

  async function onSubmit(values: PostFormValues) {
    try {
      await mutation({
        body: values.content,
        title: values.title,
      });

      toast.success("Post created successfully!");
      form.reset(); 

      setTimeout(() => {
        startTransition(() => {
          router.push("/");
          router.refresh();
        });
      }, 800);

    } catch (error) {
      console.error("Convex Server error:", error);
      toast.error("Failed to save post.");
    }
  }

  // ✅ Clean layout: No more explicit wrappers or tracking code needed here
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
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
          <form 
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("Zod Validation Failed:", errors);
              toast.error("Please fill out all required fields correctly.");
            })}
          >
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input placeholder="Enter a catchy title" aria-invalid={fieldState.invalid} {...field} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea placeholder="Write your blog content here..." rows={6} aria-invalid={fieldState.invalid} {...field} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing article...
                  </>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
