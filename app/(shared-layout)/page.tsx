"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
 
// 1. Create a sub-component that safely hooks into the URL parameters
 function AuthToastListener() {
 const searchParams = useSearchParams();
 const router = useRouter();

 useEffect(() => {
    const loginStatus = searchParams.get("login");
    const signupStatus = searchParams.get("signup");

    if (loginStatus === "success") {
      toast.success("Logged in successfully");
      router.replace("/"); // Cleans the URL parameter immediately
    }

    if (signupStatus === "success") {
      toast.success("Account created successfully!");
      router.replace("/"); // Cleans the URL parameter immediately
    }
  }, [searchParams, router]);

  return null; // This component doesn't render HTML, it just listens
}

 // 2. Your actual main landing home page component
export default function HomePage() {
  return (
    <div className="p-8 space-y-4">
      {/* 👈 Next.js requires useSearchParams to be wrapped in Suspense */}
      <Suspense fallback={null}>
        <AuthToastListener />
      </Suspense> 
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>page.tsx</h1>
      </div>
    </div>  
  );
}


