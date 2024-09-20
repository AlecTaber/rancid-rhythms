import db from '../models/index.js'; // Import the default export from models
const { Review } = db; // Extract Review from the db object

export const up = async () => {
  await Review.bulkCreate([
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

