"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "../../components/ui/button";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();

  useEffect(() => {
    if (!isAuthLoading && !session) {
      toast.error("Please sign in to access this page.");
      router.push("/auth/login");
    }
  }, [session, isAuthLoading, router]);

  // Keep a clean loading state visible while verifying security tokens
  if (isAuthLoading) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  // Prevent restricted interface elements from rendering during redirect handoff
  if (!session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative w-full">
      {/* Absolute Back Button Layout Anchor */}
      <div className="absolute top-5 left-5 z-50">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeft className="mr-2 size-4" />
          Go Back
        </Link>
      </div>
      
      {/* Wrapped Page Views Content Container */}
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
