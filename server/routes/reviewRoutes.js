import express from 'express';
import {addReview, getReviewsByAlbum, getReviewsByUser} from '../controllers/reviewController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',protect, addReview);
router.get('/album/:id', getReviewsByAlbum);
router.get('/user/:id', getReviewsByUser);
router.get('/user',protect, getReviewsByUser);

router.get('/reviews', protect, async (req, res) => {
    // Fetch reviews for the authenticated user
    const userId = req.user.id; // Get user ID from the decoded token
    // Implement fetching reviews logic here...
});


export default router;