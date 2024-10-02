import express from 'express';
import albumRoutes from './routes/albumRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import sequelize from './config/connection.js';


import authRoutes from './routes/authRoutes.js'; 

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(express.static('../client/dist'));
app.use('/albums', albumRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/api/auth', authRoutes); 


// Sync the database and start the server
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


