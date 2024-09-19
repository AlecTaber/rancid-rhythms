// seeders/[timestamp]-demo-albums.js
import { Album } from '../models/album.js';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('albums', [
    {
      title: 'Abbey Road',
      artist: 'The Beatles',
      year: 1969,
      coverUrl: 'https://coverartarchive.org/release/12345/front', // Replace with a valid cover URL
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      coverUrl: 'https://coverartarchive.org/release/67890/front', // Replace with a valid cover URL
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('albums', null, {});
};
