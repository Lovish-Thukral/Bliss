import postData from "../modules/post.module.js";
import Userdata from "../modules/user.module.js";
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

const uploadImage = async (buffer, mimetype) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: mimetype.startsWith('video') ? 'video' : 'image' },
            (error, result) => {
                if (error) reject(error);
                else resolve({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            }
        );
        
        stream.end(buffer);
    });
};

export const postController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const curruntUser = req.user;
        const { buffer, mimetype } = req.file;
        const { description, location } = req.body;
        const user = await Userdata.findById(curruntUser._id).session(session);
        
        if (!user) return res.status(404).json({ message: "User not found" });

        const imageData = await uploadImage(buffer, mimetype);
        const PostToUpload = new postData({
            alt: 'user_upload',
            description: description || `${user.username}${Date.now()}`,
            location,
            image: imageData.url,
            user: user.username
        });

        const savedPost = await PostToUpload.save({ session });
        user.posts.push(savedPost._id);
        await user.save({ session });
        
        await session.commitTransaction();
        res.status(201).json({
            message: "Upload successful",
            status: "operation Completed",
            post: savedPost
        });
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    } finally {
        session.endSession();
    }
};

export const profileController = async (req, res) => {
    try {
        const curruntUser = req.user;
        const { buffer, mimetype } = req.file;
        const imageData = await uploadImage(buffer, mimetype);
        
        const user = await Userdata.findByIdAndUpdate(
            curruntUser._id,
            { profilepic: imageData.url },
            { new: true }
        ).select('username profilepic');
        
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.status(200).json({
            message: "Upload successful",
            status: "operation Completed",
            profile: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

export const viewpostController = async (req, res) => {
    try {
        const { postID } = req.body; 
        if (!postID) return res.status(400).json({ message: "Post ID is required" });
        
        const post = await postData.findById(postID).lean();
        if (!post) return res.status(404).json({ message: "Post not found" });
        
        res.status(200).json({
            message: "Post retrieved successfully",
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving post", error: error.message });
    }
};