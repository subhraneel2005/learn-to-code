"use client"

import { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Courses(){

    interface Course {
        _id: string;  
        title: string;
        description: string;
        price: number;
        img?: string;
        published?: boolean;
    }

    const [courses,setCourses] = useState<Course[]>([]);


    useEffect(() =>{
        const fetchAllCourses = async () => {
            try {
                const response = await fetch("/api/allcourses");
                const data = await response.json();

                setCourses(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAllCourses();
    },[])

    const { data: session } = useSession()
  if(session){
    return(
        <main className="min-h-screen w-full p-3  text-slate-400 flex justify-center items-center select-none">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                {
                    courses.map((singleCourse) => (
                        <div key={singleCourse._id}>
                            <CardContainer className="inter-var">
                            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                            {singleCourse.title}
                            </CardItem>
                            <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                            {singleCourse.description}
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src={singleCourse.img!}
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                            <CardItem
                                translateZ={20}
                                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                            >
                               {`₹${singleCourse.price}`}
                            </CardItem>
                            <Button variant="destructive">Delete</Button>
                            </div>
                        </CardBody>
                        </CardContainer>
                        </div>
                    ))
                }
            </div>
        </main>
    )}
    return (<div className="min-h-screen w-full p-3 flex justify-center text-slate-400 items-center select-none">
     <div className="md:w-[600px] w-[300px] h-[370px] block space-y-10 mt-10 md:mt-56">
      <h1 className="text-3xl font-extrabold md:text-5xl text-center">Please sign in to continue</h1>
      <div className="flex justify-center items-center h-auto w-auto">
        <Button variant="outline" onClick={() => signIn()}>Sign in</Button>
      </div>
     </div>
  </div>)
}