"use client"

import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { SearchInput } from "./SearchInput"

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth()

    const handleLogout = async () => {
        try {
            // 👈 Better Auth native logout wrapper
            const response = await authClient.signOut({
                // callbackURL forces a clean redirection while allowing the local code context to finish executing toasts
                callbackURL: "/" 
            });

            if (response?.error) {
                toast.error(response.error.message || "Failed to log out", {duration: 8000 });
                return;
            }

            // Keep the logout success message on screen for 6 seconds
            toast.success("Logged out successfully", { duration: 6000 });

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
