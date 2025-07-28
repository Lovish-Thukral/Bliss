import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    alt: { type: String, required: true },
    description: { type: String},
    likesCount: { type: Array , default: [] },
    Comment: { type: Array, default: [] },
    Share: {type: Array, default: []},
    location: { type: String},
    image: {type : String, require : true},
    user : {type : String, require : true}
}, {timestamps : true})

const postData = mongoose.model("UserPosts", PostSchema);
export default postData;