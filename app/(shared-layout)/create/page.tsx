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
import { useMutation, useConvexAuth } from "convex/react"; 
import { authClient } from "@/lib/auth-client"; 
import { z } from "zod";
import { useEffect } from "react";
import { useTransition } from "react";  // Import useTransition from React
import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react
import { toast } from "sonner";// Import the toast function from sonner
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation


type PostFormValues = z.infer<typeof postSchema>;

export default function CreateRoute() {
  const mutation = useMutation(api.posts.createPost);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { isAuthenticated } = useConvexAuth();
  const [isPending, startTransition] = useTransition(); // Initialize useTransition
  // 👈 Wrap this in a useEffect so it only prints ONCE when the status changes
  useEffect(() => {
    console.log("--- SYSTEM AUTH STATUS ---");
    console.log("Is Better-Auth Logged In?:", !!session);
    console.log("Is Convex Client Synced?:", isAuthenticated);
  }, [session, isAuthenticated]); 
//   If your only goal is to inspect the authentication state when 
//   the page first loads, leave the array completely empty. 
//   This ensures the system status prints exactly once when the user arrives
//    on the page and stays quiet during form submissions.

//    If you want to ensure the console log wait until the authentication libraries
//   finish loading their initial states (since they might start as 
//   undefined or loading), you can use a tracking reference (useRef). 
//   This allows you to keep the dependencies accurate without spamming your console 
//   during form redirects:tsx
//  import { useEffect, useRef } from "react"; // 👈 Add useRef to your imports

// // Inside your CreateRoute component:
// const hasLoggedStatus = useRef(false);
// useEffect(() => {
//   // Only log if we haven't logged a valid status yet
//   if (!hasLoggedStatus.current && session !== undefined) {
//     console.log("--- SYSTEM AUTH STATUS ---");
//     console.log("Is Better-Auth Logged In?:", !!session);
//     console.log("Is Convex Client Synced?:", isAuthenticated);
//     hasLoggedStatus.current = true; // Lock it so it never logs again
//   }
// }, [session, isAuthenticated]); 

  const form = useForm<PostFormValues>({ 
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      image: undefined,
    },
  });
  const { isSubmitting } = form.formState;
   // Combine Hook Form's submission tracking with Next.js's 
   // transition router tracking
  const isLoading = isSubmitting || isPending;

  async function onSubmit(values: PostFormValues) {
    console.log("Form passed validation! Sending data to Convex...", values);
    try {
      // 1. Await mutation
      await mutation({
          body: values.content,
          title: values.title,
      });
      // 2. Trigger toast messaging immediately
      toast.success("Post created successfully!");
      form.reset(); // Reset the form after successful submission

      // 3. Keep the visual loading spinner active while
      //    Next.js finishes resolving the new page destination
      //    Pause for 800ms so the user can easily read the toast message,
      //    then route them back to the index page.
       // then route them back to the index page.
      setTimeout(() => {
        startTransition(() => {
          router.push("/");
          router.refresh();
        });
      }, 800);

      startTransition(() => {
        router.push("/");
        router.refresh();
      }); 
    } catch (error: any) {
      // 2. This CATCH block is critical. It resets the "Creating..."
      // button if the server rejects it.
      console.error("Convex Server rejected the post:", error);
      alert("Error: Look at your browser console to see the backend message!");
    } 
  }

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
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Zod Validation Failed:", errors);
              toast.error("Please fill out all required fields correctly.");
            })}
          >
            <FieldGroup className="gap-y-4">
               {/* Title Field */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input 
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter a catchy title" 
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Content Body Field */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Write your blog content here..." 
                      // rows={6}
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Post"}
              {/* Dynamic Submission Button */}
              <Button type="submit" disabled = {isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {/* <span className="pl-2">Creating...</span>    */}
                    Publishing article...
                  </>
                ) : (
                  // <span>Create Post</span>
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
