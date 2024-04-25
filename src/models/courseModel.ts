import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
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
    date:{
        type: Date,
        default: Date.now
    },
    img: {
        type: String
    }
    
})

const Course = mongoose.models.courses || mongoose.model("courses", courseSchema);

export default Course;