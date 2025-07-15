import jwt from 'jsonwebtoken';
import Userdata from '../modules/user.module.js';

const middleauth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please login first', status: 'no token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token', status: 'token error' });
    }

    const user = await Userdata.findById(decoded.id).select('_id username loginstatus');

    if (!user) {
      return res.status(404).json({ message: 'Invalid user! Please login again', status: 'middleware error' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token verification failed', error: error.message });
  }
};

export default middleauth;
