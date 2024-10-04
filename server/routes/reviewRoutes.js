import express from 'express';
import {addReview, getReviewsByAlbum, getReviewsByUser, getHighestRatedAlbums, getLowestRatedAlbums} from '../controllers/reviewController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/album/:musicBrainzId', getReviewsByAlbum);
//router.get('/user/:id', getReviewsByUser);
router.get('/user',protect, getReviewsByUser);
router.get('/highest-rated', getHighestRatedAlbums);
router.get('/lowest-rated', getLowestRatedAlbums);
router.post('/',protect, addReview);

//router.get('/reviews', protect, async (req, res) => {
    // Fetch reviews for the authenticated user
    //const userId = req.user.id; // Get user ID from the decoded token
    // Implement fetching reviews logic here...
//});


export default router;