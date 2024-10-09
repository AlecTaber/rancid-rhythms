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

export { getAlbums, getAlbumById };