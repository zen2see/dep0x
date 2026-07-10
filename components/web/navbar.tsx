"use client"

import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { SearchInput } from "./SearchInput"
import { useRouter } from "next/navigation"

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const router = useRouter()
    const handleLogout = async () => {
        try {
            // ✅ Better Auth standard signOut syntax using fetchOptions
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged out successfully", { duration: 6000 });
                        
                        // Force a clean redirect and state update
                        router.push("/");
                        router.refresh(); 
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message || "Failed to log out", { duration: 8000 });
                    }
                }
            });

        } catch (error) {
            console.error("Logout runtime error:", error);
            toast.error("An unexpected error occurred during logout.");
        }
    };

    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        0xBytes <span className="text-blue-500">Pro</span>
                    </h1> 
                </Link>
               <div className="flex items-center gap-2">
                    <Link className={buttonVariants({variant: 'ghost'})} href="/">Home</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/blog" >Blog</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/create" >Create</Link>
               </div>
            </div>
          
            <div className="flex items-center gap-2">
                <div className="hidden md:block mr-2">
                    <SearchInput />
                </div>
               {isLoading ? null : isAuthenticated ? (
                    <Button onClick={handleLogout}>   
                        Logout
                    </Button>    
                ): (    
                    <>
                        <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
                        <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    )      
}
