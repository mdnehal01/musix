import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const updateUserRecents = async (song_id: string, user_id: string | undefined) => {
    const supabase = createClientComponentClient();

    const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('recent_song')
        .eq('id', user_id)
        .single();

    if (fetchError) {
        console.error('Error fetching recent songs:', fetchError);
    } else {
        console.log('Current recent songs:', userData.recent_song);
    }

    if (userData) {
        let updatedRecentSongs = userData.recent_song || [];
      
        // Add the new song ID to the array
        updatedRecentSongs.push(song_id);
      
        // Optional: Limit the array to the last 5 songs
        // if (updatedRecentSongs.length > 5) {
        //   updatedRecentSongs = updatedRecentSongs.slice(-5); // Keep only the last 5
        // }
      
        // Update the array in the database
        const { data, error } = await supabase
          .from('users')
          .update({ recent_song: updatedRecentSongs })
          .eq('id', user_id)
          .select();
      
        if (error) {
          console.error('Error updating recent songs:', error);
        } else {
          console.log('Updated recent songs:', data);
        }
    
    }
};

export default updateUserRecents;