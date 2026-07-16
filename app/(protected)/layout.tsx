"use client";

import { authClient } from "@lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@components/ui/button";
import Link from "next/link";
import { Navbar } from "../../components/web/navbar";

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
    <div className="min-h-screen w-full">
      <Navbar />

      <div className="relative w-full">
        <div className="absolute left-5 top-5 z-50">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Link>
        </div>

        <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-16 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
