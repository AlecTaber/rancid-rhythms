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
    const { rating, review, albumTitle, albumMbid } = req.body;
    const userId = req.user.id; // The authenticated user's ID

    try {
        // Check if the album exists in the database by MBID
        let album = await Album.findOne({ where: { mbid: albumMbid } });

        // If the album doesn't exist, create it
        if (!album) {
            album = await Album.create({
                title: albumTitle,
                mbid: albumMbid
            });
        }

        // Now create the review, associated with the album
        const newReview = await Review.create({
            rating,
            review,
            albumId: album.id,
            userId
        });

        res.status(201).json({ message: 'Review added successfully', newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addReview, getReviewsByAlbum, getReviewsByUser };