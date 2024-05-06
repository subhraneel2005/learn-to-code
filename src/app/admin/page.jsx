"use client"

import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "@/firebase/config"
import {db} from "@/firebase/config"
import { useState,useEffect } from "react"
import { addDoc, collection, getDocs} from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminPanel(){

  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState('');
  const [user] = useAuthState(auth);

  const [courses, setCourses] = useState([]);

  const userMail = user?.email;

  const signOutHandler = () => {
    auth.signOut();
  }

  const publishCourse = async (e) => {

    e.preventDefault();

    const data = {
      title,
      des,
      price,
      img,
      userMail
    };

    courses.push(data);
    
    try {
      await addDoc(collection(db, "courses"),{
        ...data
      });
      
    } catch (error) {
      console.log(error);
      
    }

    setCourses(courses);
    // setTitle("");
    // setDes("");
    // setPrice(0);
    // setImg("");

    // window.location.reload();
  }

  const getCourse = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses = querySnapshot.docs.map(doc =>({id: doc.id, ...doc.data}));
    setCourses(courses);
  }

  useEffect(() => {
    getCourse();
  },[])
  
  return(
    <main className="flex justify-center items-center min-h-screen w-full p-4">
      <div className="block space-y-6">

        <div className="flex w-full justify-between px-7">
          <div className="block">
            <h1 className="text-2xl text-center">Admin Panel</h1>
            <p className="text-lg text-center">Welcome {user?.email}</p>
          </div>
          <div>
            <Button variant="destructive" onClick={signOutHandler}>Sign Out</Button>
          </div>
        </div>

        <h1 className="text-center text-xl">Create Course</h1>
        <Input placeholder="Course title" value={title} onChange={(e) => setTitle(e.target.value) }/>
        <Input placeholder="Course Description" value={des} onChange={(e) => setDes(e.target.value) }/>
        <Input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value)) }/>
        <Input  placeholder="Course Image" value={img} onChange={(e) => setImg(e.target.value)}/>
        <div>{`Admin: ${userMail}`}</div>

        <div><Button variant="secondary" onClick={publishCourse}>Publish Course</Button></div>

        <h1 className="text-center text-2xl">Your Courses</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {
            courses.map(({title,des,img,price,userMail}) => (
              <div className="block space-y-3">
                <h1>Course title: {title}</h1>
                <p>Course description: {des}</p>
                <img className="w-[240px] h-[200px] rounded-xl" src={img} alt="Course Image" />
                <div className="flex justify-between">
                  <p>Price: {price}</p>
                  <p>Author: {userMail}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}
