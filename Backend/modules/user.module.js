import mongoose from "mongoose";

const userdataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    mobile: { type: String },
    profilepic: { type: String, default: "https://www.w3schools.com/howto/img_avatar.png" },
    loginstatus: { type: Boolean, default: false },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    bio: { type: String, default: "Hey there! I am using this app" },
    posts: { type: Array, default: [] },

}, { timestamps: true });

const Userdata = mongoose.model("USERDATABASE", userdataSchema);

export default Userdata;