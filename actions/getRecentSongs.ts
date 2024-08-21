import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");

const getRecentSongs = async (songIds: any) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .in('id', songIds);

    if (error) {
        throw new Error(error.message);
    }

    // @ts-ignore
    const orderedSongs = songIds.reduce((acc: any[], id: any) => {
        const song = data.find((song: any) => song.id === id);
        if (song && !acc.some(existingSong => existingSong.id === song.id)) {
            acc.push(song);
        }
        return acc;
    }, []);
    
    return orderedSongs;
};

export default getRecentSongs;
