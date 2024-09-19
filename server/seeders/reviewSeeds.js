// seeders/[timestamp]-demo-reviews.js
import { Review } from '../models/review.js';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('reviews', [
    {
      review: 'An incredible album that defined a generation.',
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      review: 'A timeless classic with amazing production.',
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('reviews', null, {});
};
