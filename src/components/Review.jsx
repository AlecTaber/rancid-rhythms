import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Review = ({ albumTitle, albumArtist, albumId }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewsList, setReviewsList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5001/reviews/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Not authenticated');
                    }
                    return response.json();
                })
                .then(() => {
                    setIsLoggedIn(true); // Set the user as logged in
                })
                .catch(() => {
                    setIsLoggedIn(false); // Set the user as not logged in
                    navigate('/signin'); // Redirect to sign-in if not logged in
                });
        } else {
            setIsLoggedIn(false);
            navigate('/signin');
        }
    }, [navigate]);

    useEffect(() => {
        if (albumId) {
            fetch(`http://localhost:5001/reviews/album/${albumId}`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    setReviewsList(data);
                })
                .catch((error) => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }, [albumId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to leave a review.');
            navigate('/signin');
            return;
        }

        console.log('Submitting review with:', {
            rating,
            review,
            title: albumTitle,
            artist: albumArtist,
        });

        // Use the dynamic albumTitle and albumMbid from the MusicBrainz API search result
        if (review && rating > 0) {
            fetch('http://localhost:5001/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rating,
                    review,
                    title: albumTitle,
                    artist: albumArtist,
                    albumId: albumId,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Review response data:', data);
                    if (data.User && data.User.username) {
                        setReviewsList([{ rating, review, User: { username: data.User.username } }, ...reviewsList]);
                    } else {
                        console.error("User or username not found in response data");
                    }
                    setReview('');
                    setRating(0);
                })

                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className="review-section">
            {reviewsList.length === 0 ? (
                <p>No reviews yet. Be the first to leave a review!</p>
            ) : (
                <p>Leave a review!</p>
            )}
            {reviewsList.length > 0 && (
                <div className="reviews-list mt-4">
                    {reviewsList.map((r, index) => (
                        <div key={index} className="review border p-4 rounded-lg shadow-sm mb-4">
                            <h3 className="font-bold">{r.User.username}</h3>
                            <div className="stars">
                                {Array(r.rating).fill().map((_, i) => (
                                    <span key={i} className="text-yellow-500">★</span>
                                ))}
                            </div>
                            <p>{r.review}</p>
                        </div>
                    ))}
                </div>
            )}
            {/* Show the review submission form only if the user is logged in */}
            {isLoggedIn && (
                <div>
                    <div className="mt-2">
                        {[...Array(5)].map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setRating(index + 1)}
                                className={`mx-1 text-2xl ${rating > index ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review..."
                            className="w-full p-2 border rounded-md"
                            rows="4"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-4 bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {!isLoggedIn && <p>Please sign in to leave a review.</p>}
        </div>
    );
};

export default Review;