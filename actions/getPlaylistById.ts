import { Playlist } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getPlaylistById = async (playlist_id: string): Promise<Playlist[]> => {
    const supabase = createClientComponentClient();

    if (!playlist_id) {
        return [];
    }

    const { data, error } = await supabase
        .from('playlist')
        .select('*')
        .eq('playlist_id', playlist_id)
        .single()

    if (error) {
        console.error("Error fetching songs by ID:", error);
        return [];
    }
    return (data as Playlist[]) || [];
};

export default getPlaylistById;
