import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const AlbumDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [album, setAlbum] = useState(location.state?.album || {});
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!album.id) {
      // Fetch album details from MusicBrainz if not passed in state
      fetch(`https://musicbrainz.org/ws/2/release/${id}?fmt=json`)
        .then((response) => response.json())
        .then((data) => {
          setAlbum(data);
          // Fetch preview URL from iTunes
          fetchPreview(data.title, data["artist-credit"]?.[0]?.name);
        });
    } else {
      // Fetch preview URL from iTunes using passed album data
      fetchPreview(album.title, album["artist-credit"]?.[0]?.name);
    }
  }, [id, album]);

  const fetchPreview = async (albumTitle, artistName) => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(albumTitle)} ${encodeURIComponent(artistName)}&entity=album`
      );
      const data = await response.json();
      const previewTrack = data.results?.[0]?.previewUrl;
      setPreviewUrl(previewTrack || '');
    } catch (error) {
      console.error("Error fetching preview from iTunes:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{album.title || 'Album Title'}</h1>
      <img
        src={`https://coverartarchive.org/release/${album.id}/front`}
        alt={album.title}
        className="w-64 h-64 object-cover mb-4"
      />
      <button
        onClick={() => setPreviewUrl(previewUrl)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Listen to a Sample
      </button>
      {previewUrl && (
        <audio controls>
          <source src={previewUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <button className="bg-green-500 text-white p-2 rounded mt-4">
        Leave a Review
      </button>
    </div>
  );
};

export default AlbumDetails;
