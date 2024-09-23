import db from '../models/index.js';  // Correctly import the models
const { Review, Album, User } = db;

// Get reviews by album
const getReviewsByAlbum = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { albumId: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Album,
                    attributes: ['title'],
                },
            ],
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get reviews by user
const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Album,
                    attributes: ['title'],
                },
            ],
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a new review
const addReview = async (req, res) => {
    const { rating, review, albumId = null } = req.body;
    const userId = req.user.id; // The authenticated user's ID

    try {
        const newReview = await Review.create({
            rating,
            review,
            userId,
            albumId, // Can be null for now, testing purposes
        });

        const user = await User.findByPk(userId,
            { attributes: ['username']               
        });
        res.status(201).json({
            id: newReview.id,
            rating: newReview.rating,
            review: newReview.review,
            User: user
        });

    } catch (error) {
        console.error("Error while adding review:", error);
        res.status(500).json({ error: error.message });
    }
};

export { addReview, getReviewsByAlbum, getReviewsByUser };