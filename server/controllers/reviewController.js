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
            where: { userId: req.params.id },
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
    const { rating, comment, albumId, userId } = req.body;  // Use albumId and userId
    try {
        const review = await Review.create({ rating, comment, albumId, userId });  // Match column names
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addReview, getReviewsByAlbum, getReviewsByUser };