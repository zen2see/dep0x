import Link from "next/link";

export default function abcpage() {
    return (
        <div>
            <h1>Hello from the abc page</h1>
            <Link href="/abc/helloabc">Go to helloabc</Link>
        </div>
    )
}