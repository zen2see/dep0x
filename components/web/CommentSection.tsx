"use client"

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comments";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";

interface CommentSectionProps {
  postId: Id<"posts">;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [isPending, startTransition] = useTransition();
  const createComment = useMutation(api.comments.createComment);
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: postId,
    }
  });

  async function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await createComment(data);
        form.reset({ body: "", postId: postId });
        toast.success("Comment has been created");
      }
      catch (error) {
        console.error("Error posting comment:", error);
        toast.error("Failed to post comment");
      }
    });
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">5 Comments</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts"
                  {...field}
                />
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
            )}
          />
          <Button 
            type="submit"
            disabled={isPending} 
            className={isPending ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}