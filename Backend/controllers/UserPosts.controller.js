import postData from "../modules/post.module.js";
import Userdata from "../modules/user.module.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const uploadImage = async (buffer, mimetype) => {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error('❌ Invalid buffer passed to uploadImage');
  }

  return new Promise((resolve, reject) => {
    const resourceType = mimetype?.startsWith('video') ? 'video' : 'image';

    console.log("📤 Starting Cloudinary upload...");

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary error:", error);
          return reject(error);
        }

        console.log("✅ Cloudinary uploaded successfully:", result.secure_url);
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    // Pipe the buffer into the upload stream using streamifier
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadImage;



// ✅ Post Upload Controller (No session)
export const postController = async (req, res) => {
    try {
        const curruntUser = req.user;
        console.log(curruntUser)
        const { buffer, mimetype } = req.file;
        const { description, location } = req.body;
        console.log('accessed')
        const user = await Userdata.findById(curruntUser._id);
        console.log(user)
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log('imagedata')
        const imageData = await uploadImage(buffer, mimetype);
        console.log(imageData)

        const PostToUpload = new postData({
            alt: 'user_upload',
            description: description || `${user.username}${Date.now()}`,
            location,
            image: imageData.url,
            user: user.username
        });

        const savedPost = await PostToUpload.save();

        user.posts.push(savedPost._id);
        await user.save();

        res.status(201).json({
            message: "Upload successful",
            status: "operation Completed",
            post: savedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// ✅ Profile Picture Upload Controller
export const profileController = async (req, res) => {
    try {
        const curruntUser = req.user;
        console.log(curruntUser)
        const { buffer, mimetype } = req.file;

        console.log(buffer);
        const imageData = await uploadImage(buffer, mimetype);
        const user = await Userdata.findByIdAndUpdate(
            curruntUser._id,
            { profilepic: imageData.url },
            { new: true }
        ).select('username profilepic');
        console.log(user)
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

// ✅ View Post Controller
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
