import postData from "../modules/post.module.js";
import Userdata from "../modules/user.module.js";
import cloudinary from 'cloudinary'; 

const uploadImage = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: false,
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export const postController = async (req, res) => {
    const curruntUser = req.user;
    const image = req.file?.path;
    const { description, location } = req.body;

    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }

    try {
        const check = await Userdata.findById(curruntUser._id).select('username _id posts');
        if (!check) return res.status(404).json({ message: "User not found" });

        const imageData = await uploadImage(image);

        const PostToUpload = new postData({
            alt: req.file.originalname,
            description: description || `${check.username}${Date.now()}`,
            location,
            image: imageData.url,
            user: check.username
        });

        const checkUpload = await PostToUpload.save();
        if (!checkUpload) {
            return res.status(500).json({ 
                message: "Unable to upload post", 
                status: "operation Failed" 
            });
        }

        const addUserPost = await Userdata.findByIdAndUpdate(
            curruntUser._id,
            { $push: { posts: PostToUpload._id } }, 
            { new: true }
        );

        if (!addUserPost) {
            return res.status(500).json({ 
                message: "Post upload failed at user DB", 
                status: "operation Failed" 
            });
        }

        res.status(201).json({
            message: "Upload successful",
            status: "operation Completed",
            post: checkUpload
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Something went wrong", 
            error: error.message 
        });
    }
};

export const profileController = async (req, res) => {
    // const curruntUser = req.user;
    const image = req.file?.path;

    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }

    try {
        const imageData = await uploadImage(image);
        const check = await Userdata.findByIdAndUpdate(curruntUser._id, {
            profilepic : imageData.url,
        },{ new: true }).select('username profilepic');

        if (!check) {
            return res.status(500).json({ 
                message: "Unable to upload post or User Not Exist", 
                status: "operation Failed" 
            });
        }

        res.status(201).json({
            message: "Upload successful",
            status: "operation Completed",
            profile : check
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Something went wrong", 
            error: error.message 
        });
    }
};

export const viewpostController = async (req, res) => {
    const { postID } = req.body; 

    if (!postID) {
        return res.status(400).json({
            message: "Post ID is required"
        });
    }

    try {
        const post = await postData.findById(postID).lean(); 

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post retrieved successfully",
            post
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving post",
            error: error.message
        });
    }
};