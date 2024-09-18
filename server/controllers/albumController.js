import Album from '../models/album';

const getAlbums = async (req, res) => {
    const albums = await Album.findAll();
    res.json(albums);
}

const getAlbumById = async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    res.json(album);
}     

const addAlbum = async (req, res) => {
    const album = await Album.create(req.body);
    res.json(album);
}

export { getAlbums, getAlbumById, addAlbum };