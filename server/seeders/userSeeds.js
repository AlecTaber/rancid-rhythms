import db from '../models/index.js'; // Import the default export from models
const { User } = db; // Extract User from the db object
import bcrypt from 'bcrypt'; // Import bcrypt for hashing passwords

export const up = async () => {
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);

  await User.bulkCreate([
    {
      username: 'john_doe',
      password: hashedPassword1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'jane_doe',
      password: hashedPassword2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};
