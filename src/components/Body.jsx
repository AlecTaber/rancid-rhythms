import React, { useState, useEffect } from "react";


// Dummy function to simulate fetching data from an API
const fetchAlbums = async (type) => {
  // Replace this with actual API call logic
  if (type === "trending") {
    return [
      { id: 1, name: "Hot Album 1", cover: "link_to_album_cover_1" },
      { id: 2, name: "Hot Album 2", cover: "link_to_album_cover_2" },
      { id: 3, name: "Hot Album 3", cover: "link_to_album_cover_3" },
    ];
  } else if (type === "bad") {
    return [
      { id: 1, name: "Bad Album 1", cover: "link_to_album_cover_3" },
      { id: 2, name: "Bad Album 2", cover: "link_to_album_cover_4" },
      { id: 3, name: "Bad Album 3", cover: "link_to_album_cover_5" },
    ];
  }
  return [];
};

const Body = ({ section }) => {
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [badAlbums, setBadAlbums] = useState([]);

  useEffect(() => {
    const getTrendingAlbums = async () => {
      const albums = await fetchAlbums("trending");
      setTrendingAlbums(albums);
    };

    const getBadAlbums = async () => {
      const albums = await fetchAlbums("bad");
      setBadAlbums(albums);
    };

    if (section === "home") {
      getTrendingAlbums();
      getBadAlbums();
    }
  }, [section]);

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

          {/* Hot and Trending Albums */}
          <h3 className="text-2xl font-semibold text-black mb-4">
            Hot and Trending Albums
          </h3>
          <div className="album-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {trendingAlbums.map((album) => (
              <div
                key={album.id}
                className="album bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={album.cover}
                  alt={album.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <p className="mt-4 text-center font-semibold text-black">
                  {album.name}
                </p>
              </div>
            ))}
          </div>

          {/* Albums That Sound Good on Mute */}
          <h3 className="text-2xl font-semibold text-black mb-4">
            Albums That Sound Good on Mute
          </h3>
          <div className="album-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {badAlbums.map((album) => (
              <div
                key={album.id}
                className="album bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={album.cover}
                  alt={album.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <p className="mt-4 text-center font-semibold text-black">
                  {album.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      );

    case "profile":
      return (
        <section className="p-8 bg-green-50">
          <h2 className="text-3xl font-bold text-black mb-4">Your Profile</h2>
          <p className="text-lg text-black">
            Here's where you can see your reviews and other profile information.
          </p>
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
