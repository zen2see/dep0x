"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export function BlogSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce logic: delays network requests until typing pauses for 300ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Hook handles active state querying automatically 
  const results = useQuery(
    api.posts.searchPosts,
    debouncedTerm ? { term: debouncedTerm, limit: 5 } : "skip"
  );

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <Input
        type="search"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      {/* Floating search dropdown panel */}
      {searchTerm && results && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground border rounded-md shadow-lg z-50 overflow-hidden">
          {results.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post._id}`}
              className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-0"
            >
              {post.imageUrl && (
                <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="overflow-hidden">
                <h4 className="font-semibold truncate text-sm">{post.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{post.body}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
