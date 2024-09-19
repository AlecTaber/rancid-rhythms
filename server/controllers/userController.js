import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    const {userName, password} = req.body;
    const user = await User.create({userName, password});
    res.json(user);
}

const loginUser = async (req, res) => {
    const {userName, password} = req.body;
    const user = await User.findOne({where: {userName}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: 'Invalid username or password'});
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
    res.json({token});
}

const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
}

export { registerUser, loginUser, getUserById };