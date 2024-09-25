import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fetchHighestRatedAlbums = async (setHighestRatedAlbums) => {
  try {
    const response = await fetch("http://localhost:5001/reviews/highest-rated");
    const data = await response.json();
    setHighestRatedAlbums(data);
  } catch (error) {
    console.error("Error fetching highest-rated albums:", error);
    setHighestRatedAlbums([]);  // Set an empty array in case of an error
  }
};

const fetchLowestRatedAlbums = async (setLowestRatedAlbums) => {
  try {
    const response = await fetch("http://localhost:5001/reviews/lowest-rated");
    const data = await response.json();
    setLowestRatedAlbums(data);
  } catch (error) {
    console.error("Error fetching lowest-rated albums:", error);
    setLowestRatedAlbums([]);  // Set an empty array in case of an error
  }
};

const fetchUserReviews = async (setUserReviews) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
    return;
  }
  try {
    const response = await fetch("http://localhost:5001/reviews/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const reviews = await response.json();
    console.log("Fetched reviews with albums:", reviews);
    setUserReviews(reviews);  // Now we can set reviews correctly
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};



const Body = ({ section }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [highestRatedAlbums, setHighestRatedAlbums] = useState([]);
  const [lowestRatedAlbums, setLowestRatedAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (section === "home") {
      fetchHighestRatedAlbums(setHighestRatedAlbums);
      fetchLowestRatedAlbums(setLowestRatedAlbums);
    }
  }, [section]);

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  // Fetch user reviews for the profile page
  useEffect(() => {
    if (section === "profile") {
      fetchUserReviews(setUserReviews, navigate);
    }
  }, [section]);

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-2xl mx-1 ${rating >= i ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  switch (section) {
    case "home":
      return (
        <section className="p-8 bg-gradient-to-br from-green-600 to-green-200">
          <h2 className="text-4xl font-extrabold text-black mb-4">
            Welcome to Rancid Rhythms
          </h2>
          <p className="text-lg text-black mb-8">
            Read and Write reviews for your favorite albums!
          </p>

          {/* Highest Rated Albums */}
          <h3 className="text-2xl font-semibold text-black mb-4">
            Highest Rated Albums
          </h3>
          <div className="album-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {Array.isArray(highestRatedAlbums) && highestRatedAlbums.length > 0 ? (
              highestRatedAlbums.map((album) => (
                <div
                  key={album.musicBrainzId}  // Use album.musicBrainzId as the key
                  className="album bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  onClick={() => handleAlbumClick(album.musicBrainzId)}
                >
                  <img
                    src={album.coverUrl || 'default-cover-url.jpg'}
                    alt={album.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <p className="mt-4 text-center font-semibold text-black">
                    {album.title}
                  </p>
                  <div className="text-center">
                    {renderStarRating(Math.round(album.averageRating))}
                  </div>
                </div>
              ))
            ) : (
              <p>No highest-rated albums available.</p>
            )}
          </div>

          {/* Lowest Rated Albums Section */}
          <h3 className="text-2xl font-semibold text-black mb-4">
            Lowest Rated Albums
          </h3>
          <div className="album-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.isArray(lowestRatedAlbums) && lowestRatedAlbums.length > 0 ? (
              lowestRatedAlbums.map((album) => (
                <div
                  key={album.musicBrainzId}  // Use album.musicBrainzId as the key
                  className="album bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  onClick={() => handleAlbumClick(album.musicBrainzId)}
                >
                  <img
                    src={album.coverUrl || 'default-cover-url.jpg'}
                    alt={album.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <p className="mt-4 text-center font-semibold text-black">
                    {album.title}
                  </p>
                  <div className="text-center">
                    {renderStarRating(Math.round(album.averageRating))}
                  </div>
                </div>
              ))
            ) : (
              <p>No lowest-rated albums available.</p>
            )}
          </div>
        </section>
      );

    case "profile":
      return (
        <section className="p-8 bg-gradient-to-br from-green-600 to-green-200 min-h-screen">
          <h2 className="text-4xl font-extrabold text-black mb-6 ">Your Profile</h2>
          <p className="text-lg text-black mb-8">Here's where you can see your reviews.</p>

          {/* Reviews section */}
          <h3 className="text-3xl font-semibold text-black mb-4">Your Reviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(!userReviews || userReviews.length === 0) ? (
              <p className="text-lg text-black">You haven't left any reviews yet.</p>
            ) : (
              userReviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  {review.Album ? (
                    <>
                      <img
                        src={review.Album.coverUrl || 'default-cover-url.jpg'}  // Ensure coverUrl is used correctly
                        alt={review.Album.title}
                        className="w-full h-64 object-cover rounded-t-lg mb-4"
                      />
                      <h4 className="text-xl font-semibold mb-2 text-black">
                        {review.Album.title}
                      </h4>
                    </>
                  ) : (
                    <>
                      <img
                        src="default-cover-url.jpg"  // Fallback image if album data is missing
                        alt="Unknown Album"
                        className="w-full h-64 object-cover rounded-t-lg mb-4"
                      />
                      <h4 className="text-xl font-semibold mb-2 text-black">
                        Unknown Album
                      </h4>
                    </>
                  )}
                  <div className="stars">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-2xl mx-1 ${review.rating > index ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mt-2">{review.review}</p>
                </div>
              ))
            )}
          </div>
        </section>
      );


    default:
      return (
        <section className="p-8 bg-red-50 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Page Not Found</h2>
          <p className="text-lg text-black">
            Sorry, the page you're looking for could not be found.
          </p>
        </section>
      );
  }
};

export default Body;
