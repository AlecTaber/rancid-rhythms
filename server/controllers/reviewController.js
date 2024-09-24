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
                //Temporary removal of Album model to test reviews
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
    console.log("Request body:", req.body); // Log the incoming request body

    const { rating, review, title, artist, year, coverUrl } = req.body;
    const userId = req.user.id; // The authenticated user's ID

    // Check if required fields are present
    if (!title || !artist || !rating || !review) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Check if the album exists in the database based on title and artist
        let album = await Album.findOne({ where: { title, artist } });

        // If the album doesn't exist, call addAlbum to create and save it
        if (!album) {
            try {
                album = await Album.create({ title, artist, year, coverUrl });
            } catch (error) {
                return res.status(500).json({ error: "Failed to create album." });
            }
        }

        const newReview = await Review.create({
            rating,
            review,
            userId,
            albumId: album.id,
        });

        const user = await User.findByPk(userId,
            { attributes: ['username']               
        });

        if (!user) {
            throw new Error("User not found");
        }
        
        res.status(201).json({
            id: newReview.id,
            rating: newReview.rating,
            review: newReview.review,
            User: user,
            Album: { title: album.title, artist: album.artist },
        });

        res.status(201).json({ message: "Review created and attached to an album successfully", newReview })
    } catch (error) {
        console.error("Error while adding review:", error);
        res.status(500).json({ error: error.message });
    }
};

export { addReview, getReviewsByAlbum, getReviewsByUser };