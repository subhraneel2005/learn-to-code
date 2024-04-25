import {connectDB} from "@/database/dbConfig";
import Course from "@/models/courseModel";
import {NextRequest,NextResponse} from "next/server";

export async function GET(){
    try {
        const courses = await Course.find({});
        return NextResponse.json(courses);
    } catch (error) {
        console.log(error);
    }
}