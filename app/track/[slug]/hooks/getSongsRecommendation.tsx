// @ts-ignore
import SpotifyWebApi from 'spotify-web-api-node';
import fetch from 'node-fetch';

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID || 'your-client-id',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'your-client-secret'
});

// Cache access token globally to avoid multiple requests
let cachedAccessToken: string | null = null;
let tokenExpiryTime: number = 0;

// Function to get access token
async function getSpotifyAccessToken(): Promise<void> {
  if (cachedAccessToken && Date.now() < tokenExpiryTime) {
    // Use cached token if it's still valid
    spotifyApi.setAccessToken(cachedAccessToken);
    return;
  }

  // Fetch new access token
  const clientId = process.env.SPOTIFY_CLIENT_ID || 'your-client-id';
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || 'your-client-secret';
  const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' })
    });

    const data = await response.json();
    if (response.ok) {
        // @ts-ignore
      cachedAccessToken = data.access_token;
      // @ts-ignore
      tokenExpiryTime = Date.now() + data.expires_in * 1000; // Cache expiry time
      spotifyApi.setAccessToken(cachedAccessToken);
      console.log('Access Token:', cachedAccessToken);
    } else {
      console.error('Failed to retrieve access token:', data);
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
}

// Function to get track ID based on song name and artist
export async function getTrackId(songName: string, artistName: string): Promise<string | null> {
  try {
    await getSpotifyAccessToken(); // Ensure token is set before making any requests

    const result = await spotifyApi.searchTracks(`track:${songName} artist:${artistName}`, { limit: 1 });
    const tracks = result.body.tracks?.items;
    if (tracks && tracks.length > 0) {
      return tracks[0].id; // Return the first match's ID
    } else {
      console.log(`Track "${songName}" by ${artistName} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error searching for track:', error);
    return null;
  }
}

// Function to get song recommendations based on song name and artist
export async function recommendSongs(songName: string, artistName: string): Promise<{ recommendations: { name: string; artists: string[] }[] }> {
    try {
      const trackId = await getTrackId(songName, artistName);
      if (trackId) {
        const recommendations = await spotifyApi.getRecommendations({
          seed_tracks: [trackId],
          limit: 5
        });

        console.log(recommendations)
  
        return {
          // @ts-ignore
          recommendations: recommendations.body.tracks.map(track => ({
            name: track.name,
            // @ts-ignore
            artists: track.artists.map(artist => artist.name)
          }))
        };
      } else {
        return { recommendations: [] }; // Return an empty array if no track found
      }
    } catch (error) {
      console.error('Error retrieving recommendations:', error);
      return { recommendations: [] };
    }
  }
  
  
// Example usage
