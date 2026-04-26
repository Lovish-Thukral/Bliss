import mongoose from "mongoose";

const connectDB = async () => {
  const dbUri =
    "mongodb+srv://lovish:Lovish24@bliss2end.1astx6q.mongodb.net/";

  try {
    await mongoose.connect(dbUri);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

export default connectDB;
