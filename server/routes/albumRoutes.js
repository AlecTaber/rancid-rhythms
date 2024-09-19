import express from 'express';
import { getAlbums, getAlbumById, addAlbum } from '../controllers/albumController.js';
const router = express.Router();

router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.post('/', addAlbum);

export default router;