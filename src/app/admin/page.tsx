"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"


export default function AdminPanel() {
  const { data: session } = useSession()
  if(session) {
    return (
      <main className="min-h-screen w-full p-3  text-slate-400 flex justify-center items-center select-none">
        <nav className="fixed top-0 left-0 w-full bg-transparent z-10 flex py-2 px-4 gap-6">
          <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
          <Avatar>
            <AvatarImage src={session.user?.image!} />
            <AvatarFallback>{session.user?.email}</AvatarFallback>
          </Avatar>
        </nav>
      </main>
    )
  }
  return <div className="min-h-screen w-full p-3 flex justify-center text-slate-400 items-center select-none">
     <div className="md:w-[600px] w-[300px] h-[370px] block space-y-10 mt-10 md:mt-56">
      <h1 className="text-3xl font-extrabold md:text-5xl text-center">Please sign in to continue</h1>
      <div className="flex justify-center items-center h-auto w-auto">
        <Button variant="outline" onClick={() => signIn()}>Sign in</Button>
      </div>
     </div>
  </div>
}