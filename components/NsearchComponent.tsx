"use client"
import React, { useState } from 'react';
import axios from 'axios';

type Track = {
  name: string;
  artist: string;
  url: string;
};

const NsearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Track[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('/search', {
        params: { query }
      });
      console.log('Search Results:', response.data);
      const tracks = response.data?.results?.trackmatches?.track || [];
      alert(response.data.results)
      setResults(tracks);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for a song..." 
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {results.map((track, index) => (
          <div key={index}>
            <p>{track.name} by {track.artist}</p>
            <a href={track.url} target="_blank" rel="noopener noreferrer">Listen on Last.fm</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NsearchComponent;
