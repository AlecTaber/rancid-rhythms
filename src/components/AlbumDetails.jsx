import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Review from './Review';

const AlbumDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [album, setAlbum] = useState(location.state?.album || {});
  const [previewUrl, setPreviewUrl] = useState('');
  const [isFetchingPreview, setIsFetchingPreview] = useState(false);

  // Extract details from the state
  const albumTitle = location.state?.albumTitle || album.title || 'Unknown Album';
  const albumArtist = location.state?.albumArtist || 'Unknown Artist';
  const albumDate = location.state?.albumDate || album.date || 'Unknown Date';

  useEffect(() => {
    if (!album.id) {
      // Fetch album details from MusicBrainz if not passed in state
      fetch(`https://musicbrainz.org/ws/2/release/${id}?fmt=json`)
        .then((response) => response.json())
        .then((data) => {
          setAlbum(data);
          // Fallback if artist name is not available
          const artistName = data["artist-credit"]?.[0]?.name || 'Unknown Artist';
          fetchPreview(data.title, artistName);
        });
    }
  }, [id]);

  useEffect(() => {
    if (album.id) {
      fetchPreview(album.title, albumArtist);
    }
  }, [album, albumArtist]);

  const fetchPreview = async (albumTitle, artistName) => {
    console.log(`Searching iTunes for album: ${albumTitle}, artist: ${artistName}`);
    setIsFetchingPreview(true);
    
    const searchTerm = artistName !== 'Unknown Artist' 
      ? `${encodeURIComponent(artistName)}+${encodeURIComponent(albumTitle)}`
      : encodeURIComponent(albumTitle);
  
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&entity=album`
      );
      const data = await response.json();
      console.log('iTunes API response:', data);
  
      // Find the album with a partial title match
      const albumMatch = data.results.find(
        (item) => item.collectionName.toLowerCase().includes(albumTitle.toLowerCase())
      );
      console.log('Matching album:', albumMatch);
  
      if (albumMatch) {
        const trackResponse = await fetch(
          `https://itunes.apple.com/lookup?id=${albumMatch.collectionId}&entity=song`
        );
        const trackData = await trackResponse.json();
        console.log('Track data from iTunes:', trackData);
  
        // Find a track with previewUrl in the album
        const previewTrack = trackData.results.find(
          (track) => track.previewUrl
        );
        console.log('Preview track:', previewTrack);
        setPreviewUrl(previewTrack?.previewUrl || '');
      } else {
        console.log('No matching album found');
        setPreviewUrl('');
      }
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
          <p><strong>Artist:</strong> {albumArtist}</p>
          <p><strong>Release Date:</strong> {albumDate}</p>
        </div>
      </div>

      <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
        <h2 className="text-xl font-semibold mb-4">{albumTitle}</h2>
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
          albumId={album.id}
          albumTitle={albumTitle}
          albumArtist={albumArtist}
        />
      </div>
    </div>
  );
};

export default AlbumDetails;

