import db from '../models/index.js';  // Correctly import the models
const { Review, Album, User } = db;

// Get reviews by album
const getReviewsByAlbum = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { albumId: req.params.musicBrainzId }, // Use the MusicBrainz ID
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get reviews by user
const getReviewsByUser = async (req, res) => {
    try {
      const reviews = await Review.findAll({
        where: { userId: req.user.id },  
        include: [
          {
            model: Album,
            attributes: ['title', 'coverUrl'],  // Ensure coverUrl is included here
          },
          {
            model: User,
            attributes: ['username'],  // Include username from the User model
          },
        ],
      });
  
      console.log("Fetched reviews: ", JSON.stringify(reviews, null, 2));
  
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Add a new review
const addReview = async (req, res) => {
    console.log("Request body:", req.body); // Log the incoming request body

    const { rating, review, title, artist, year, coverUrl, musicBrainzId } = req.body;
    const userId = req.user.id; // The authenticated user's ID

    // Check if required fields are present
    if (!title || !artist || !rating || !review || !musicBrainzId || !coverUrl) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Check if the album exists in the database based on title and artist
        let album = await Album.findOne({ where: { musicBrainzId } });

        // If the album doesn't exist, create a new one
        if (!album) {
            console.log(`Creating new album: ${title} by ${artist}`);
            album = await Album.create({ title, artist, year, coverUrl, musicBrainzId });
            console.log('Album created:', album);
        }

        const newReview = await Review.create({
            rating,
            review,
            userId,
            albumId: album.musicBrainzId,
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
            Album: { musicBrainzId: album.musicBrainzId, title: album.title, artist: album.artist },
        });

    } catch (error) {
        console.error("Error while adding review:", error);
        res.status(500).json({ error: error.message });
    }
};

export { addReview, getReviewsByAlbum, getReviewsByUser };