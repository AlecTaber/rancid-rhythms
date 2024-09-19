import Review from '../models/review';
import Album from '../models/album';
import User from '../models/user';

const getReviewsByAlbum = async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            albumId: req.params.id,
        },
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
}

const getReviewsByUser = async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.params.id,
        },
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
}

const addReview = async (req, res) => {
    const { rating, comment, AlbumId, UserId } = req.body; 
    const review = await Review.create({ rating, comment, AlbumId, UserId }); 
    res.json(review);
};

export { addReview, getReviewsByAlbum, getReviewsByUser };