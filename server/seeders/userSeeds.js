import db from '../models/index.js';
const { User } = db;
import bcrypt from 'bcrypt';

export const up = async () => {
  console.log('Seeding users...');
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);

  try {
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
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

