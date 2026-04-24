import Link from "next/link"

export function Navbar() {
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        0xBytes <span className="text-blue-500">Pro</span>
                    </h1> 
                </Link>
        
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-lg">Home</Link>
                    <Link href="/blog" className="text-lg">Blog</Link>
                    <Link href="/create" className="text-lg">Create</Link>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Link href="/auth/sign-up">Sign Up</Link>
                <Link href="/auth/login">Login</Link>
            </div>
        </nav>
    )
        
}