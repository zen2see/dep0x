"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { postSchema } from "@/app/schemas/blog";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react"; 
import { z } from "zod";
import { useTransition } from "react";  
import { Loader2 } from "lucide-react"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 
import { CreateBlogAction } from "@/app/actions";

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
      image: undefined,
    },
  });

  const { isSubmitting } = form.formState;
  const isLoading = isSubmitting || isPending;

  async function onSubmit(values: PostFormValues) {
    try {
      // await mutation({
      //   body: values.content,
      //   title: values.title,
      // });
      // console.log("This runs on the client side") 
      // Will show up in web developer tools
      // You also will get a message from the console.log of app/actions.ts
      // SERVER ACTION
      // await CreateBlogAction()
       // 1. Create a FormData instance instead of an object
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      // 2. Append the file safely if it exists
      if (values.image) {
        formData.append("image", values.image);
      }
      form.reset(); 
      setTimeout(() => {
        startTransition(async() => {
          // Send the FormData  to ROUTE HANDLER
          console.log("This runs on the client side - ROUTE HANDLER")
          const response = await fetch('/api/create-blog', {
            method: "POST",
            // NOTE: Do NOT set "Content-Type" headers when sending FormData.
            // The browser needs to automatically calculate the boundary strings.
            // headers: {
            //   "Content-Type": "application/json",
            // },
            // body: JSON.stringify({
            //   title: values.title,
            //   content: values.content,
            // }),
            body: formData,
          });
          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.error || "Failed to create post");
          }
          toast.success("Post created successfully!");
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
                    <Input placeholder="Enter a catchy title" 
                           aria-invalid={fieldState.invalid} {...field} />
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
                    <Textarea placeholder="Write your blog content here..." rows={6} 
                               aria-invalid={fieldState.invalid} {...field} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>image</FieldLabel>
                    <Input
                      placeholder="Choose an image..."
                      aria-invalid={fieldState.invalid}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file);
                      }}
                    /> 
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
