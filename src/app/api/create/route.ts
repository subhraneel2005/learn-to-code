import { NextRequest, NextResponse } from 'next/server';
import Course from '@/models/courseModel';
import { connect } from '@/database/dbConfig';
import { getSession } from "next-auth/react"
import { NextApiRequest } from 'next';

connect();

export async function POST(request: NextRequest) {

  try {
    const reqData = await request.json();
    const { price, title, description, published, img, creatorName } = reqData;

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