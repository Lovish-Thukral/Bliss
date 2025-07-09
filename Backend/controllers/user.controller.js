import Userdata from '../modules/user.module.js';
import CreateToken from '../utilities/GenTokenUtil.js';
import bcrypt from "bcrypt";

const confirmPass = (password, confirmPassword, res) => {

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (password !== confirmPassword) {
        return res.status(404).json({ message: "Passwords do not match" });
    }
}



const decryptpass = async (password, hash, res) => {
    const passbol = await bcrypt.compare(password, hash)
    !passbol ? res.status(404).json({ status: "incorrect password" }) : true
}


export const signupUser = async (req, res) => {


    try {

        const { name, email, username, password, confirmPassword, mobile } = req.body;
        if (!name || !username || !password || !confirmPassword || (!email && !mobile)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await Userdata.findOne({ username: username }).select('username');
        if (user) {
            return res.status(500).json({ message: "User already existed" });
        }

        confirmPass(password, confirmPassword, res);

        const hashsalt = await bcrypt.genSalt(5);
        const passhash = await bcrypt.hash(password, hashsalt)


        const newuser = new Userdata({
            name: name,
            email: email || null,
            username: username,
            password: passhash,
            mobile: mobile || null,
        })


        const savedUser = await newuser.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating user", error: error });
    }
}



export const loginUser = async (req, res) => {
    const { username, password, mobile, email } = req.body;
    if ((!username && !mobile && !email) || !password) {
        return res.status(400).json({ message: "At least one of username, mobile, or email and the password are required" });
    }

    let user = await Userdata.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const decryption = decryptpass(password, user.password, res);

    if (decryption) {

        user = await Userdata.findByIdAndUpdate(
            user._id,
            { loginstatus: true },
            { new: true }
        ).select('-password -__v -mobile -email');

        if (!user) {
            return res.status(500).json({ message: "Error logging in user" });
        }

    }

    CreateToken({ userid: user._id, loginstatus: true }, res)

    return res.status(200).json({ message: "User logged in successfully", user: user });
}


export const findUser = async (req, res) => {
    const { username } = req.body || {};
    if (!username) {
        const datalist = await Userdata.find({}).select('username');
        const userlist = datalist.map(user => user.username);
        return res.status(200).json({ message: "Caution ! No Input Found", users: userlist });
    }

    const user = await Userdata.findOne({ username: username }).select('username followers following bio profilepic posts');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const workinguser = req.user;
    const followsyou = user.followers.includes(workinguser.username);
    const followedbyyou = workinguser.following.includes(user.username);

    return res.status(200).json({
        message: "User found successfully",
        user: {
            username: user.username,
            followers: user.followers.length,
            following: user.following.length,
            bio: user.bio,
            profilepic: user.profilepic,
            posts: user.posts,
            followsyou: `${followsyou ? "follows you" : "does not follow you"}`,
            followedbyyou: `${followedbyyou ? "following" : "not following"}`,
            message: "go to edit api for changing follow and unfollow"
        }
    });

}



export const deleteUser = async (req, res) => {
    try {
        const { username, password, confirmPassword, confirmation } = req.body;
        const currentUser = req.user;

        if (!confirmation || !['Yes', 'yes', 'confirm', 'Confirm'].includes(confirmation)) {
            return res.status(400).json({ message: "Please confirm your operation first" });
        }

        if (currentUser.username !== username) {
            return res.status(404).json({ message: "User ID didn't match, please check username", status: "operation failed" });
        }

        confirmPass(password, confirmPassword, res);

        const checkuser = await Userdata.findById(currentUser._id).select('password username _id');

        if (!checkuser) {
            console.log(checkuser)
            return res.status(404).json({ message: "User not found" });
        }

        decryptpass(password, checkuser.password, res)

        await Userdata.findByIdAndDelete(checkuser._id);
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const logoutuser = async (req, res) => {

    const { username, password, confirmPassword, confirmation } = req.body;
    const currentUser = req.user;

    if (!confirmation || !['Yes', 'yes', 'confirm', 'Confirm'].includes(confirmation)) {
        return res.status(400).json({ message: "Please confirm your operation first" });
    }

    if (currentUser.username !== username) {
        return res.status(404).json({ message: "User ID didn't match, please check username", status: "operation failed" });
    }

    confirmPass(password, confirmPassword, res);

    const check = await Userdata.findById(currentUser._id).select('password _id');
    console.log(check)

    if (!check) {
        console.log(check)
        return res.status(404).json({ message: "User not found" });
    }

    decryptpass(password, check.password, res)

    try {
        const logoutconfir = await Userdata.findByIdAndUpdate(
            check._id,
            { loginstatus: false },
            { new: true }
        );

        const cookieremoval = res.cookie("loginauth", "", {
            maxAge: 0
        })

        if (logoutconfir && cookieremoval) {
            return res.status(200).json({ message: "logout successful" });
        } else {
            return res.status(500).json({ message: "server error" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error", error: err.message });
    }
}


export const editUser = async (req, res) => {

    const params = req.params.editToMake;
    const requestededit  = req.body || {};
    const currentUser = req.user;

    try {
        const check = await Userdata.findById(currentUser._id).select('-password');

        if (!check) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!check || !(params in check)) {
            return res.status(400).json({ message: "invalid request", status: "operation failed" });
        }

        const update = await Userdata.findByIdAndUpdate(
            currentUser._id,
            { ...requestededit },
            { new: true }
        );


        if (!update) {
            return res.status(500).json({ Message: "Internal Error Occurred", status: "Operation Failed" });
        }

        return res.status(200).json({
            message: `request update in ${params} success`,
            Status: "operation success",
            updatedData: update
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error", error: err.message });
    }
}