import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BlogSearchBar } from "@/components/ui/blog-search-bar"; 

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl"> Our Blog </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team.
        </p>
      </div>
      {/* ADDED: Mounted search engine directly into layout flow */}
      <div className="pb-8">
        <BlogSearchBar />
      </div>

      <Suspense fallback={<SkeletonLoadingUi />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  // ADDING A DELAY TO SHOW SUSPENSE/STREAMING
  await new Promise((resolve) => setTimeout(resolve, 2000))
  try {
    const data = await fetchQuery(api.posts.getPosts);
    // RETURN 1: Handles the empty database state
    if (!data || data.length === 0) {
      return (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No blog posts found. Create one to get started!
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => {
          // Resolve the image source URL fallback sequence safely
          const imgSource = post.imageUrl || 
                    "https://ix-marketing.imgix.net/footer-image.png?ixembed=1731958278380&auto=format,compress";

          return (
            <Card className="pt-0 overflow-hidden" key={post._id}>
              {/* FIXED BRACKET: min-h-[192px] and bg-muted are fully separated now */}
              <div className="relative h-48 w-full min-h-48 bg-muted overflow-hidden">
                <Image
                  src={imgSource}
                  alt={post.title || "Blog post image"}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="rounded-t-lg object-cover"
                  unoptimized
                />
              </div>
              <CardContent className="p-6">
                <Link href={`/blog/${String(post._id)}`}>
                  <h1 className="text-2xl font-bold transition-colors hover:text-primary line-clamp-2">
                    {post.title}
                  </h1>
                </Link>
                <p className="text-muted-foreground line-clamp-3 mt-2">{post.body}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Link className={buttonVariants({ className: "w-full" })} href={`/blog/${post._id}`}>
                  Read more
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Error inside LoadBlogList component:", error);
    return (
      <div className="col-span-full text-center py-12 text-destructive">
        Failed to load blog posts. Please check your console layout configurations.
      </div>
    );
  }
}

function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
