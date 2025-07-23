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
            return res.status(200).json({ message: "All fields are required" });
        }

        const user = await Userdata.findOne({ username: username }).select('username');
        if (user) {
            return res.status(200).json({ message: "User already existed" });
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


        const savedUser = await newuser.save()
        res.status(200).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating user", error: error });
    }
}


export const loginUser = async (req, res) => {
    const { username, password, mobile, email } = req.body;

    if ((!username && !mobile && !email) || !password) {
        return res.status(400).json({ message: "Fields Required" });
    }

    let key, data;
    if (username) {
        key = "username";
        data = username;
    } else if (mobile) {
        key = "mobile";
        data = mobile;
    } else if (email) {
        key = "email";
        data = email;
    }

    let user = await Userdata.findOne({ [key]: data });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = decryptpass(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    user = await Userdata.findByIdAndUpdate(
        user._id,
        { loginstatus: true },
        { new: true }
    ).select('-password -__v -mobile -email');

    if (!user) {
        return res.status(500).json({ message: "Error logging in user" });
    }

    const token = CreateToken({ id: user._id, loginstatus: true });

    return res.status(200).json({
        message: "Logged Successfully",
        token
    });
};



export const findUser = async (req, res) => {
    const { username, UserID } = req.body || {};
    if (!username && !UserID) {
        const datalist = await Userdata.find({}).select('username');
        const userlist = datalist.map(user => user.username);
        return res.status(200).json({ users: userlist, message: 'no body found' });
    }

    if (username && !UserID) {
        try {
            const user = await Userdata.find({
                $or: [
                    { username: { $regex: username } },
                    { name: { $regex: username, $options: 'i' } }
                ]
            }).select('username name profilepic');

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({
                userlist: user
            }
            );
        } catch (error) {
            res.status(400).json({ message: "error occured", error: error })
        }


    }

    if (!username && UserID) {
        try {
            const user = await Userdata.findById(UserID).select('username name profilepic');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ ...user });
        } catch (error) {
            res.status(400).json({ message: "error occured", error: error })
        }
    }

}

export const openProfile = async (req, res) => {
    const { username } = req.params;
    console.log(username)
    if (!username) {

        return res.status(404).json({ message: 'User not found — username missing', username });
    }

    try {
        const user = await Userdata.findOne({ username }).select('username followers following bio profilepic posts name');

        if (!user) {
            return res.status(404).json({ message: "User not found in DB" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


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

    const currentUser = req.user;
    const check = await Userdata.findById(currentUser._id).select('_id');

    if (!check) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const logoutconfir = await Userdata.findByIdAndUpdate(
            check._id,
            { loginstatus: false },
            { new: true }
        );

        if (logoutconfir) {
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
    const { field } = req.params;
    const { value, UserID } = req.body;
    const currentUser = req.user;

    const fieldValidations = {
        name: { type: 'string', maxLength: 50 },
        username: { type: 'string', maxLength: 30, unique: true },
        bio: { type: 'string', maxLength: 200 },
    };

    try {
        const user = await Userdata.findById(currentUser._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (field === 'follow') {
            if (!UserID) {
                return res.status(400).json({ success: false, message: "Target user ID is required" });
            }

            if (UserID === currentUser._id.toString()) {
                return res.status(400).json({ success: false, message: "Cannot follow yourself" });
            }

            const targetUser = await Userdata.findById(UserID);
            if (!targetUser) {
                return res.status(404).json({ success: false, message: "Target user not found" });
            }

            const isFollowing = user.following.includes(UserID);
            const action = isFollowing ? 'unfollow' : 'follow';

            const DBUpdate = await Promise.all([
                Userdata.findByIdAndUpdate(currentUser._id, {
                    [isFollowing ? '$pull' : '$addToSet']: { following: UserID }
                }),
                Userdata.findByIdAndUpdate(UserID, {
                    [isFollowing ? '$pull' : '$addToSet']: { followers: currentUser._id }
                })
            ]);

            if (DBUpdate) {
                return res.status(200).json({
                    success: true,
                    message: `Successfully ${action}ed user`,
                    data: { action, UserID, following: !isFollowing }
                });
            }
        }


        if (!fieldValidations[field]) {
            return res.status(400).json({
                success: false,
                message: "Invalid update field",
                allowedFields: ['follow', ...Object.keys(fieldValidations)]
            });
        }

        if (value === undefined) {
            return res.status(400).json({ success: false, message: `Value for ${field} is required` });
        }

        const updatedUser = await Userdata.findByIdAndUpdate(
            currentUser._id,
            { [field]: value },
            { new: true, runValidators: true, select: '-password -__v' }
        );

        return res.status(200).json({
            success: true,
            message: `${field} updated successfully`,
            data: updatedUser
        });

    } catch (err) {
        console.error(`User edit error (${field}):`, err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};



export const checkusername = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await Userdata.findOne({ username: username }).select('username');
        if (!user) {
            return res.status(200).json({
                status: false
            });
        } else {
            return res.status(200).json({
                status: true
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error occurred',
            status: 'Server issue, please try again later',
            error: error.message
        });
    }
};


export const TokenAuthController = async (req, res) => {
    const curruntUserdata = req.user
    return res.status(200).json({
        user: {
            ...curruntUserdata
        }
    })
}
