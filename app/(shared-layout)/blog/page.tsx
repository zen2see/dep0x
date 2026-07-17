// "use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Doc } from "@convex/_generated/dataModel";
// import { api } from "@convex/_generated/api"
// import { useQuery } from "convex/react" // only works in cient
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Key, Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { resolve } from "path";

export default function BlogPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000)) 
    // // const posts = useQuery(api.posts.getPosts) 
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Our Blog
                </h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Insights, thoughts, and trends from our team.
                </p>
            </div>
            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
            {posts?.map((post: { _id: Key | null | undefined; }) => ( */}
            <Suspense
                fallback={<SkeletonLoadingUi />}>
                <LoadBlogList />
            </Suspense>
        </div>
    )
}
async function LoadBlogList() {
    // ADDING A DELAY TO SHOW SUSPENSE/STREAMING
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const data = await fetchQuery(api.posts.getPosts)
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 2. Cast post as Doc<"posts"> (replace "posts" with your actual Convediv className="flex flex-col space-y-3" key={i}></div>x table name) */}
            {data?.map((post) => (
                <Card className="pt-0" key={post._id}>
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image src="https://ix-marketing.imgix.net/footer-image.png?ixembed=1731958278380&auto=format,compress"
                            alt="image"
                            fill
                            loading="eager"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="rounded-t-lg"
                        />
                    </div>
                    <CardContent>
                        <Link href={`/blog/${String(post._id)}`}>
                            <h1 className="text-2xl font-bold transition-colors hover:text-primary">
                                {post.title}
                            </h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                    </CardContent>
                    <CardFooter>
                        <Link className={buttonVariants({ className: "w-full" })} href={`/blog/${post._id}`}>Read more</Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
function SkeletonLoadingUi() {
    return (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {[
                ...Array(3)].map((_, i) => (
                    <div className="flex flex-col space-y-3" key={i}>
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2 flex flex-col">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                ))
         }
        </div>
    )

}