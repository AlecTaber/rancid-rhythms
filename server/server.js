import express from 'express';
import cors from 'cors';
import albumRoutes from './routes/albumRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 
import reviewRoutes from './routes/review.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/albums', albumRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/review', reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

