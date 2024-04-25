import { NextRequest, NextResponse } from 'next/server';
import Course from '@/models/courseModel';
import { connect } from '@/database/dbConfig';

connect();

export async function POST(request: NextRequest){
    try {
        const reqData = await  request.json()
        const{price, title, description, published} =  reqData;

        console.log(reqData);

        const course = await Course.findOne({title})

        if(course){
            return NextResponse.json({error: "Title already exists"}, {status: 400})
        }  

        const newCourse = new Course({
            title,
            description,
            price,
            published,
        })

       const savedCourse = await newCourse.save();
       console.log(newCourse);


       return NextResponse.json({
        message: "User registered successfully",
        success: true,
        savedCourse
       })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
} 