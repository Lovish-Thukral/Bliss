import postData from "../modules/post.module.js";
import Userdata from "../modules/user.module.js";

const uploadImage = async (imagePath) => {

    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: false,
    };

    try {

        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.public_id;
    } catch (error) {
        console.error(error);
    }
};

export const postController = async (req, res) => {
    const curruntUser = req.user;
    const image = req.file.path;
    const { description, location } = req.body;

    if (!image) {
        return res.status(400).json({ message: "invalid input" });
    }


    try {
        const check = await Userdata.findById(curruntUser._id).select('username _id posts')

        if (!check) return res.status(404).json({ message: "invalid User" })

        const imageuri = uploadImage(image)

        const PostToUpload = new postData({
            alt: req.file.originalname,
            description: description || `${check.username}${Date.now()}`,
            location,
            image: imageuri
        })

        const checkUpload = await PostToUpload.save()

        if (!checkUpload) return res.status(500).json({ message: "unable to upload ! server error", status: "operation Failed" })

        const addUserPost = await Userdata.findByIdAndUpdate(curruntUser._id, {
            posts: [...check.posts, PostToUpload._id]
        }, { new: true })

        if (!addUserPost) return res.status(500).json({ Messsage: "Post Upload Failed at user DB", status: "operation Failed" })

        res.status(200).json({
            message: "upload Successful",
            status: "operation Completed",
            post: addUserPost.posts
        });


    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "something went wrong", error: error })
    }

}

export const viewpostController = async (req, res) => {
    const { postIDs } = req.body;

    if (!postIDs) return res.status(404).json({
        message: "No Post Found"
    });

    // const posts 
}
