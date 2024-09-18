import React, { useState } from 'react';


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    
    if (e.target.value.length > 2) {
      try {
        const token = "SPOTIFY_CLIENT_SECRET";
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${e.target.value}&type=album,artist,track`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(response.data.tracks.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for artists, albums, or tracks"
        className="search-input"
      />
      {results.length > 0 && (
        <div className="dropdown">
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                <div className="result-item">
                  <img src={result.album.images[0].url} alt={result.name} />
                  <span>{result.name} by {result.artists[0].name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;