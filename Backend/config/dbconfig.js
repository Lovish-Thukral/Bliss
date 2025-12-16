import mongoose from "mongoose";

const connectDB = async () => {
	const dbUri = "mongodb+srv://lovish:<db_password>@bliss2end.1astx6q.mongodb.net/";
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
