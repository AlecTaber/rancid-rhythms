import React from "react";
import { useState } from "react";

const Review = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewsList, setReviewsList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (review) {
            setReviewsList([...reviewsList, { review, rating }]);
            setReview('');
            setRating(0);
        }
    };

    return (
        <div> {/* Parent div wrapping everything */}
          <div className="review-section">
            {reviewsList.length === 0 ? (
              <p>No reviews yet. Be the first to leave a review!</p>
            ) : (
              <div className="reviews-list">
                {reviewsList.map((r, index) => (
                  <div key={index} className="review border p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="font-bold">Username</h3> {/* Placeholder for username */}
                    <div className="stars">
                      {Array(r.rating)
                        .fill()
                        .map((_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                    </div>
                    <p>{r.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
      
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
    ); // Correctly closed the return statement and the component
};

export default Review;