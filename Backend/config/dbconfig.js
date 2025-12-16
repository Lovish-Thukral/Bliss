import mongoose from "mongoose";

const connectDB = async () => {
  const dbUri =
    "mongodb+srv://lovish:YTjFZb9hqnxTwmsS@bliss2end.1astx6q.mongodb.net/blissdb?retryWrites=true&w=majority";

  try {
    await mongoose.connect(dbUri);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

export default connectDB;
