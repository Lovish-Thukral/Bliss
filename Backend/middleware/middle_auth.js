import jwt from 'jsonwebtoken';
import Userdata from '../modules/user.module.js';

const middleauth = async (req, res, next) => {
    try {
        const token = req.cookies.loginauth
        token

        if (!token) {
            return res.status(404).json({ message: "plaese login first", status: "no token found" });
        }

        const tokenvalidation = jwt.verify(token, process.env.SECRET_KEY);

        if (!tokenvalidation) {
            return res.status(404).json({ message: "invalid token", status: "token error" });
        }

        const user = await Userdata.findById(tokenvalidation.userid).select('_id username loginstatus');

        if (!user) {
            return res.status(404).json({ message: "invalid user! please login again", status: "middleware error" });
        } else {
            req.user = user
            next();
        }

    } catch (error) {
        res.status(400).json({ message: "token not found" })
    }
};

export default middleauth;