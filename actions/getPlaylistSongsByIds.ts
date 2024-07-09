import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");

const getPlaylistSongsByIds = async (songIds: string[]) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .in('id', songIds);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export default getPlaylistSongsByIds;
