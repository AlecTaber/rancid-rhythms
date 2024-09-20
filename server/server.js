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


// Sync the database and start the server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });  // Use the sequelize instance to alter the database schema
    console.log('Database synced successfully!');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();


