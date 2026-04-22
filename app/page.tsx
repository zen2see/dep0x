import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>page.tsx page</h1>
      <Link href="/abc">Go To abc</Link>
    </div>
  );
}
