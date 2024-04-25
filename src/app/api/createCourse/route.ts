import Course from "@/models/courseModel";
import {NextRequest,NextResponse,NextMiddleware} from "next/server";
import {connectDB} from "@/database/dbConfig";
import { request } from "http";

connectDB();

export async function POST(req: NextRequest){
    try {
        const reqData = await req.json();
    const { title, description, price, published, date, id, img} = reqData;

    const course = await Course.findOne({title});

    if(!course){
        const newCourse = new Course({
            title,
            description,
            price,
            published,
            date,
            id,
            img
        })

        const savedCourse = newCourse.save();
        console.log(newCourse);
        
        return NextResponse.json({
            message: "New course created successfully",
            success: true,
            savedCourse
        })
    }
    else{
        return NextResponse.json({error: "Course title already exists"}, {status: 400});
    }
    } catch (error) {
        console.log(error);
        
    }
}