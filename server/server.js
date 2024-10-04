import express from 'express';
import Cors from 'cors';
import routes from './routes/index.js';
import sequelize from './config/connection.js';

const PORT = process.env.PORT || 5001;
const app = express();
const cors = Cors();
app.use(express.json());
//app.use(express.static('../client/dist'));
app.use(cors);
app.use("/api",routes);


// Sync the database and start the server
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });  // Use the sequelize instance to alter the database schema
    console.log('Database synced successfully!');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();


