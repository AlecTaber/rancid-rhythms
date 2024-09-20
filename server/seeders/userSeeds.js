import db from '../models/index.js';
const { Review } = db;

export const up = async () => {
  await Review.bulkCreate([
    {
      review: 'An incredible album that defined a generation.',
      rating: 5,
      userId: 1,  // Assume john_doe has ID 1
      albumId: 1,  // Assume Abbey Road has ID 1
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      review: 'A timeless classic with amazing production.',
      rating: 4,
      userId: 2,  // Assume jane_doe has ID 2
      albumId: 2,  // Assume The Dark Side of the Moon has ID 2
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};
