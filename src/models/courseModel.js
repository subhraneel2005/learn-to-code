import mongoose from "mongoose";
import { type } from "os";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    published:{
        type: Boolean,
        default: false
    },
    img: {
        type: String
    },
    creatorName: {
       type: String
    },
    _id: {
        type: String,
        default: () => Math.random().toString(36).substr(2,9)
    }
})

const Course = mongoose.models.courses || mongoose.model("courses", courseSchema);

export default Course;