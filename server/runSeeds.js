import db from './models/index.js';  // Import default export from models

const { sequelize } = db;  // Extract sequelize from the db object

import { up as seedAlbums } from './seeders/albumSeeds.js';
import { up as seedReviews } from './seeders/reviewSeeds.js';
import { up as seedUsers } from './seeders/userSeeds.js';

(async () => {
  try {
    // Sync the database
    await sequelize.sync();  // Ensure sequelize is correctly accessed here

    // Run each seeder manually
    console.log('Seeding albums...');
    await seedAlbums();

    console.log('Seeding reviews...');
    await seedReviews();

    console.log('Seeding users...');
    await seedUsers();

    console.log('Database seeded successfully!');
    process.exit(0);  // Exit the process after seeding
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);  // Exit with failure code
  }
})();
