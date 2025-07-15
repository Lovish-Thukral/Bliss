import jwt from 'jsonwebtoken';
import Userdata from '../modules/user.module.js';

const protectedLogin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const user = await Userdata.findById(decoded.id).select('-password -__v -_id -mobile -email');

      if (user && user.loginstatus === true) {
        return res.status(400).json({
          message: 'Existing account found. Please logout first.'
        });
      }
    }

    next();
  } catch (error) {
    console.log('Protected Login Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default protectedLogin;
