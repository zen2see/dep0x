// "use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Doc } from "@convex/_generated/dataModel";
// import { api } from "@convex/_generated/api"
// import { useQuery } from "convex/react" // only works in cient
import Image from "next/image";
import Link from "next/link";
import { Key } from "react";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function BlogPage() {
    // const posts = useQuery(api.posts.getPosts) 
    const posts = await fetchQuery(api.posts.getPosts);
    if (!posts) return <p>Loading...</p>;
    // if (posts.length === 0) return <p>No posts yet.</p>;

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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
            {/* 2. Cast post as Doc<"posts"> (replace "posts" with your actual Convex table name) */}
            {posts?.map((post: Doc<"posts">) => (    
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
                            <Link className={buttonVariants({className: "w-full",})} href={`/blog/${post._id}`}>Read more</Link> 
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div> 
    )
}