import express from 'express';
import  User  from '../models/user.js'; // Adjust the import according to your structure
import jwt from 'jsonwebtoken';

const router = express.Router();

// Sign Upx
//router.post('/register', async (req, res) => {
    //const { username, password } = req.body;
    //try {
        //const newUser = await User.create({ username, password });
        //res.status(201).json({ id: newUser.id, username: newUser.username }); // Respond with JSON
    //} catch (error) {
        //res.status(400).json({ message: 'User creation failed', error: error.message }); // Respond with JSON
    //}
//});

// Sign In
//router.post('/signin', async (req, res) => {
    //const { username, password } = req.body;
    //try {
        //const user = await User.findOne({ where: { username } });
        //if (!user || !(await bcrypt.compare(password, user.password))) {
            //return res.status(401).json({ message: 'Invalid credentials' });
        //}
        //const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //res.json({ token });
    //} catch (error) {
        //res.status(400).json({ message: 'Sign in failed', error: error.message });
    //}
//});

export default router;
