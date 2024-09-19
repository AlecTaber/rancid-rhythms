// seeders/[timestamp]-demo-users.js
import bcrypt from 'bcrypt';
import { User } from '../models/user.js'; // Adjust the import based on your setup

export const up = async (queryInterface, Sequelize) => {
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);

  await queryInterface.bulkInsert('Users', [
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

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Users', null, {});
};
