import db from '../models/index.js';
const { Album } = db;

const getAlbums = async (req, res) => {
    const albums = await Album.findAll();
    res.json(albums);
}

const getAlbumById = async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    res.json(album);
}     

/* const addAlbum = async (albumData) => {
    try {
        const album = await Album.create(albumData);
        return album; // Return the created album
    } catch (error) {
        console.error("Error adding album:", error);
        throw new Error("Failed to create album"); // Handle error appropriately
    }
};*/

export { getAlbums, getAlbumById };