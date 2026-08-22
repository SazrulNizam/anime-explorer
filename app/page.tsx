import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
   <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-4xl font-bold">Welcome to Anime Explorer</h1>
      <p className="text-lg text-gray-500">Discover your favourite anime</p>
<Link href="/anime" className="btn btn-primary">Start Exploring</Link>
    </main>
  )
  ;
}
