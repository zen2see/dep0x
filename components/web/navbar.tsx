"use client"

import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation" 
import { SearchInput} from "./SearchInput"

export function Navbar() {
     // Note: If you migrated to Better Auth, you should use authClient.useSession() here instead!
    const { isAuthenticated , isLoading } = useConvexAuth()
    const router = useRouter() 
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    // 👈 Forces a full browser navigation to wipe Next.js route caches cleanly
                    window.location.href = "/"; 
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Failed to log out");
                },
            },
        });
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
//     return (
//         <nav className="w-full py-5 flex items-center justify-between">
//             <div className="flex items-center gap-8">
//                 <Link href="/">
//                     <h1 className="text-3xl font-bold">
//                         0xBytes <span className="text-blue-500">Pro</span>
//                     </h1> 
//                 </Link>
//                <div className="flex items-center gap-2">
//                     <Link className={buttonVariants({variant: 'ghost'})} href="/">Home</Link>
//                     <Link className={buttonVariants({variant: 'ghost'})} href="/blog" >Blog</Link>
//                     <Link className={buttonVariants({variant: 'ghost'})} href="/create" >Create</Link>
//                </div>
//             </div>
          
//             <div className="flex items-center gap-2">
//                 <div className="hidden md:block mr-2">
//                     <SearchInput />
//                 </div>
//                {isLoading ? null : isAuthenticated ? (
//                     <Button 
//                         onClick={() => 
//                             authClient.signOut({
//                                 fetchOptions: {
//                                     onSuccess: () => {
//                                         toast.success("Logged out successfully")
//                                         router.push("/")
//                                     },
//                                     onError: (error) => {
//                                         toast.error(error.error.message)
//                                     },
//                                 },
//                             })
//                         }
//                     >   
//                         Logout
//                     </Button>    
//                 ): (    
//                     <>
//                         <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
//                         <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
//                     </>
//                 )}
//                 <ThemeToggle />
//             </div>
//         </nav>
//     )      
// }

               
                
