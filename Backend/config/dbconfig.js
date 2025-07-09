import mongoose from "mongoose";

const connectDB = async () => {
	const dbUri = process.env.DB_URI;
    console.log(dbUri)
    try{
        const isconnected = await mongoose.connect(dbUri);

        isconnected ? console.log("Database connected successfully") : console.log("Database connection failed");
    }
    catch(err){
        console.error("Database connection error:", err);
    }
}

export default connectDB;