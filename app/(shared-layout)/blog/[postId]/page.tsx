import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { Metadata } from "next";

interface PostIdRouteProps { params: Promise<{ postId: Id<'posts'>}> }

export async function generateMetadata({ params }: PostIdRouteProps): 
Promise<Metadata> {
  const { postId } = await params
  const post = await fetchQuery(api.posts.getPostById, { postId: postId })
  if (!post) {
    return {
      title: "Post not found",
    }
  }
  return {
    title: post.title,
    description: post.body,
  }
}

export default async function PostIdRoute ({ params }: PostIdRouteProps) {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: postId });


  // Handle case where post is not found or has no title
  if (!post || !post.title) {
    notFound();
  }

  // Define the missing imgSource variable
  const imgSource = post.imageUrl || 
    "https://ix-marketing.imgix.net/footer-image.png?ixembed=1731958278380&auto=format,compress";

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link className={buttonVariants({ variant: "outline", className: "mb-6" })} href="/blog">
        <ArrowLeft className="mr-2 size-4" />
        Back to blog
      </Link>

      <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>

      <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden shadow-sm bg-muted">
        <Image 
          src={imgSource}
          alt={post.title || "Blog post image"}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed mt-6">
        {post.body}
      </div>

       <p className="text-sm text-muted-foreground">
        Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
      </p>

      <Separator className="my-8" />

      <CommentSection key={postId} postId={postId} />
    </div>
  );
}