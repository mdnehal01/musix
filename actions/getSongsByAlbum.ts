import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByAlbum = async (album: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!album) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('album', `%${album}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching songs by author:", error);
        return [];
    }

    return (data as Song[]) || [];
};

export default getSongsByAlbum;
