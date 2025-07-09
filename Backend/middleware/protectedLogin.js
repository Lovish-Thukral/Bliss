import jwt from 'jsonwebtoken';
import Userdata from '../modules/user.module.js';

const protectedLogin = async (req, res, next) => {
    try {
        const token = req.cookies.loginauth;
        if (token) {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (decode) {
                const user = await Userdata.findById(decode.userid).select('-password -__v -_id -mobile -email');
                if (user && user.loginstatus === true) {
                    return res.json({ message: 'Existing Account Found Please Logout First' });
                }
            }
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "internal error" });
    }
};

export default protectedLogin