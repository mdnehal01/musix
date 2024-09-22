import fetch from 'node-fetch';

export async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID || 'your-client-id';
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || 'your-client-secret';
  
  // Base64 encoding for the clientId:clientSecret
  const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      })
    });

    const data = await response.json();
    if (response.ok) {
        // @ts-ignore
      console.log('Access Token:', data.access_token);
    //   @ts-ignore
      return data.access_token; // Return the access token
    } else {
      console.error('Failed to retrieve access token:', data);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
}