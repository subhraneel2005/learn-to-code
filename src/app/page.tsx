import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home(){
  return(
    <main className="min-h-screen w-full p-3 bg-slate-950 text-slate-400 flex justify-center items-center select-none">
      <div className="h-full w-full block">
        <h1 className="text-center text-6xl font-extrabold">Learn to code 🎉</h1>
        <p className="text-slate-500 text-lg text-center mt-3">The easiest way you can learn to code and get a job with it.Explore all the courses as a student or join as an admin</p>
        <div className="flex justify-center mt-16 md:gap-52 gap-8">
          <Link href={"/student"}>
            <Button variant="outline">Enter as a student</Button>
          </Link>
          <Link href={"/admin"}>
            <Button variant="outline">Enter as an Admin</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}