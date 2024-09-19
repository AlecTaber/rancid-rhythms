import express from 'express';
import {addReview, getReviewsByAlbum, getReviewsByUser} from '../controllers/reviewController.js';
const router = express.Router();

router.post('/', addReview);
router.get('/album/:id', getReviewsByAlbum);
router.get('/user/:id', getReviewsByUser);

export default router;