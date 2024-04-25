import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect("mongodb+srv://sub:sub123@cluster0.nk6x90z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDB connected");
        })
        connection.on("error", (error) => {
            console.log("MonogDB connection error" + error);
            process.exit();
        })
    }
    catch(error) {
        console.log(error);
    }
}