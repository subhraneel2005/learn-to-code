import {NextApiRequest,NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server"
import {connect} from "@/database/dbConfig";
import Course from "@/models/courseModel";

export async function DELETE(req: NextRequest){
    
    connect();

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get;
    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if(!deletedCourse){
            return NextResponse.json({messgae:"Course not found"});
        }
        return NextResponse.json({message:"Course deleted successfully"});
        
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}