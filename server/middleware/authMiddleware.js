import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const { User } = db;

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token and get decoded payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID from the token
            const user = await User.findByPk(decoded.id, {
                attributes: ['id', 'username']
            });

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user;  // Attach the user object to the request
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;