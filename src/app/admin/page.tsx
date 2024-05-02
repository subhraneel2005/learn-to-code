"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import Link from "next/link";
import { getSession} from "next-auth/react"


export default function AdminPanel() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [published,setPublished] = useState(false);
  const [price,setPrice] = useState(0);
  const [img,setImg] = useState("");
  const [creatorName, setCreaterName] = useState("")

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const courseData = {
      title,description,price,img, creatorName
    };

    try {
      const response = await fetch("/api/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      });

      const result = await response.json();

      console.log(result);

      setTitle("");
      setDescription("");
      setCreaterName("");
      setImg("");
      setPrice(0);

      alert("Course created successfully");
    } 
    
    catch (error) {
      alert("Error creating course");
    }
  }
   
  const{ data: session} = useSession()
    if(session) {
      return (
        <main className="min-h-screen w-full p-3  text-slate-400 flex justify-center items-center select-none">
          <div className="block">
            <nav className="fixed top-0 left-0 w-full bg-transparent z-10 flex py-2 px-4 gap-6">
            <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
            <Avatar>
              <AvatarImage src={session.user?.image!}/>
            </Avatar>
            </nav>
            <div className="flex">
              <Dialog>
              <DialogTrigger asChild>
                  <Button variant="outline">Create a new course</Button>
                </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h1 className="text-center font-bold text-3xl">Create a new course</h1>
                <form onSubmit={onSubmitHandler} className="space-y-5 mt-10">
                  <Input required placeholder="Course title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                  <Input required placeholder="Course description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                  <Input required placeholder="Course Thumbnail" value={img} onChange={(e) => setImg(e.target.value)}/>
                  <Input required type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>
                  
  
                  <Button type="submit">Create</Button>
                </form>
              </DialogHeader>
            </DialogContent>
              </Dialog>
              <div className="ml-7">
              <Link href={"/admin/courses"}>
                <Button variant="outline">All Courses</Button>
              </Link>
              </div>
            </div>
          </div>
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