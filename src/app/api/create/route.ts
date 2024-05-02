import { NextRequest, NextResponse } from 'next/server';
import Course from '@/models/courseModel';
import userModel from '@/models/userModel';
import { connect } from '@/database/dbConfig';
import { getSession } from "next-auth/react"
import { NextApiRequest } from 'next';


connect();

export async function POST(request: NextRequest, req:NextApiRequest) {

  const session = await getSession({req});
  if(!session){
    console.log("not authenticated no session");
    
  }
  const currentUser = session?.user?.name;

  try {
    const reqData = await request.json();
    const { price, title, description, published, img, creatorName } = reqData;

    creatorName : currentUser;

    const course = await Course.findOne({ title });

    if (course) {
      return NextResponse.json({ error: "Title already exists." }, { status: 400 });
    }

    const newCourse = new Course({
      title,
      description,
      price,
      img,
      published,
      creatorName,
    });

    console.log(newCourse);
    
    const savedCourse = await newCourse.save();

    return NextResponse.json({
      message: "Course created successfully",
      success: true,
      savedCourse
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while creating the course." }, { status: 500 });
  }
}