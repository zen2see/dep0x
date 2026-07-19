import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  
  try {
    // Safely cast string param to Convex database ID layout
    const post = await fetchQuery(api.posts.getPostById, { 
      id: resolvedParams.id as Id<"posts"> 
    });

    if (!post) {
      notFound();
    }

    const imgSource = post.imageUrl || "https://imgix.net";

    return (
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <Link href="/blog" className={buttonVariants({ variant: "ghost", className: "mb-6" })}>
          ← Back to blogs
        </Link>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
        
        <div className="relative w-full h-96 my-6 rounded-xl overflow-hidden bg-muted">
          <Image
            src={imgSource}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed mt-6">
          {post.body}
        </div>
      </article>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
