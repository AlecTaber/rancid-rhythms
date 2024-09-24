import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Review from './Review';

const AlbumDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [album, setAlbum] = useState(location.state?.album || {});
  const [previewUrl, setPreviewUrl] = useState('');
  const [isFetchingPreview, setIsFetchingPreview] = useState(false);

  useEffect(() => {
    if (!album.id) {
      // Fetch album details from MusicBrainz if not passed in state
      fetch(`https://musicbrainz.org/ws/2/release/${id}?fmt=json`)
        .then((response) => response.json())
        .then((data) => {
          setAlbum(data);
          // Only fetch preview after setting the album
          fetchPreview(data.title, data["artist-credit"]?.[0]?.name);
        });
    }
  }, [id]);

  useEffect(() => {
    if (album.id) {
      // Fetch preview from iTunes using passed album data
      fetchPreview(album.title, album["artist-credit"]?.[0]?.name);
    }
  }, [album]);

  useEffect(() => {
    if (location.state?.album) {
      setAlbum(location.state.album);
      fetchPreview(location.state.album.title, location.state.album["artist-credit"]?.[0]?.name);
    }
  }, [location.state]);

  const fetchPreview = async (albumTitle, artistName) => {
    setIsFetchingPreview(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(albumTitle)} ${encodeURIComponent(artistName)}&entity=song`
      );
      const data = await response.json();
      const previewTrack = data.results?.[0]?.previewUrl;
      setPreviewUrl(previewTrack || '');
    } catch (error) {
      console.error("Error fetching preview from iTunes:", error);
    } finally {
      setIsFetchingPreview(false);
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-green-600 to-green-200">
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4">Track List</h2>
          <ul className="space-y-2">
            <li>Track 1</li>
            <li>Track 2</li>
            <li>Track 3</li>
            <li>Track 4</li>
            <li>Track 5</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4">Album Information</h2>
          <p><strong>Artist:</strong> {album["artist-credit"]?.[0]?.name || 'Artist Name'}</p>
          <p><strong>Release Date:</strong> {album.date || 'Release Date'}</p>
        </div>
      </div>

      <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
        <h2 className="text-xl font-semibold mb-4">{album.title || 'Album Title'}</h2>
        <img
          src={`https://coverartarchive.org/release/${album.id}/front`}
          alt={album.title}
          className="w-112 h-112 object-cover rounded-lg mb-4"
        />

        {previewUrl ? (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <audio controls src={previewUrl} className="w-full"></audio>
          </div>
        ) : (
          <p className="text-gray-500">{isFetchingPreview ? 'Fetching preview...' : 'No preview available'}</p>
        )}
      </div>

      <div className="md:col-span-3 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <Review
          albumTitle={album.title || 'Album Title'}
          albumArtist={album["artist-credit"]?.[0]?.name || 'Artist Name'}
        />
      </div>
    </div>
  );
};

export default AlbumDetails;
