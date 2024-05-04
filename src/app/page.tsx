import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home(){
  return(
    <main className="min-h-screen w-full flex justify-center items-center p-3">
      <div className="block space-y-12">
        <h1 className="text-center text-3xl">Welcome to our own course selling website 📚</h1>
        <div>
          <Link href={"/sign-in"}>
            <Button variant="outline">Authenticate</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}