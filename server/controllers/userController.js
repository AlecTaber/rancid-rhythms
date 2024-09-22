
 import db from '../models/index.js';
 import bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';
 const { User } = db;

 const registerUser = async (req, res) => {
    const {username, password} = req.body;
     const user = await User.create({username, password});
     res.json(user);
 }

 const loginUser = async (req, res) => {
    const { username, password } = req.body;

    console.log('Request Body:', req.body);

 try {
    const user = await User.findOne({ where: { username } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is missing' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login failed:', error.message);
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

 const getUserById = async (req, res) => {
     const user = await User.findByPk(req.params.id);
     res.json(user);
 }

export { registerUser, loginUser, getUserById };

