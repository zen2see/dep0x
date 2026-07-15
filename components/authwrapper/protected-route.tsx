"use client";

import { authClient } from "@lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();

  useEffect(() => {
    // Correct absolute public routing target path string 
    if (!isAuthLoading && !session) {
      toast.error("Please sign in to access this page.");
      router.push("/auth/login"); 
    }
  }, [session, isAuthLoading, router]);

  // Render a global loading skeleton while evaluating auth tokens
  if (isAuthLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  // Prevent secret children from building or flashing layout elements
  if (!session) return null;

  return <>{children}</>;
}
