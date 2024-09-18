import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to search for albums by artist's MBID (MusicBrainz ID)
  const fetchAlbumsByArtist = async (artistId) => {
    try {
      const response = await fetch(
        `https://musicbrainz.org/ws/2/release/?query=arid:${artistId}&fmt=json`
      );
      const data = await response.json();
      setResults(data.releases || []);
    } catch (error) {
      console.error("Error fetching albums by artist:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults([]);

    const queryParts = searchQuery.split(" by ");

    if (queryParts.length === 2) {
      // Case: Searching for both album and artist
      const albumTitle = queryParts[0].trim();
      const artistName = queryParts[1].trim();
      const query = `release:"${albumTitle}" AND artist:"${artistName}"`;

      try {
        const response = await fetch(
          `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(query)}&fmt=json`
        );
        const data = await response.json();
        setResults(data.releases || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // Case: Searching for either an album or artist
      const searchTerm = searchQuery.trim();
      const albumQuery = `release:"${searchTerm}"`;
      const artistQuery = `artist:"${searchTerm}"`;

      try {
        // First, search if the input matches any artist
        const artistResponse = await fetch(
          `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistQuery)}&fmt=json`
        );
        const artistData = await artistResponse.json();

        if (artistData.artists && artistData.artists.length > 0) {
          // If an artist is found, fetch albums by that artist
          const artistId = artistData.artists[0].id;
          fetchAlbumsByArtist(artistId);
        } else {
          // If no artist is found, search for an album instead
          const albumResponse = await fetch(
            `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(albumQuery)}&fmt=json`
          );
          const albumData = await albumResponse.json();
          setResults(albumData.releases || []);
        }
      } catch (error) {
        console.error("Error fetching artist or album:", error);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder='Search for an album or artist (e.g., "Abbey Road by The Beatles")'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {isLoading && <p className="mt-4 text-gray-500">Loading...</p>}

      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map((album) => (
            <li
              key={album.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => console.log("Album selected:", album)}
            >
              <img
                src={`https://coverartarchive.org/release/${album.id}/front`}
                alt={album.title}
                className="w-12 h-12 object-cover mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg"; // Fallback image
                }}
              />
              <div className="flex flex-col">
                <span className="font-semibold">{album.title}</span>
                <span className="text-sm text-gray-500">
                  {album["artist-credit"]?.[0]?.name}
                </span>
                <span className="text-sm text-gray-400">{album.date}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;