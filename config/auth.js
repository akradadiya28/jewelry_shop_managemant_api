import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("token", token);
        if (!token) {
            return res.status(401).json({ message: 'Please provide a token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);

        const user = await User.findById(decoded.userId);

        if (!user || user.tokenId !== decoded.tokenId) {
            return res.status(403).send('Session expired, please log in again.');
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default verifyUser;