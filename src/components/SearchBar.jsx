import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const fetchAlbums = async (query) => {
    try {
      const response = await fetch(
        `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(query)}&fmt=json`
      );
      const data = await response.json();
      setResults(data.releases || []);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error fetching albums from MusicBrainz:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults([]);

    await fetchAlbums(searchQuery);

    setIsLoading(false);
  };

  const handleAlbumClick = (album) => {
    navigate(`/album/${album.id}`, { state: { album } });
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder='Search for an album (e.g., "Abbey Road")'
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

      {isDropdownOpen && results.length > 0 && (
        <ul
          ref={dropdownRef} // Add ref here to the dropdown
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {results.map((album) => (
            <li
              key={album.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAlbumClick(album)}
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
