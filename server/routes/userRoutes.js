import express from 'express';
import { loginUser, getUserById, registerUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/login', loginUser);
router.get('/:id', getUserById);
router.post('/register', registerUser);

export default router;