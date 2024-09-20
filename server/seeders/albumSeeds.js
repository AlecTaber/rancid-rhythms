import db from '../models/index.js'; // Import the default export from the models
const { Album } = db; // Extract Album from the db object

export const up = async () => {
  await Album.bulkCreate([
    {
      title: 'Abbey Road',
      artist: 'The Beatles',
      year: 1969,
      coverUrl: 'https://coverartarchive.org/release/12345/front', // Replace with valid cover URL
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      coverUrl: 'https://coverartarchive.org/release/67890/front', // Replace with valid cover URL
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

