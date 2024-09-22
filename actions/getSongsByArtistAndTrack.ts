import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongByArtistAndTracks = async (author: string, title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!author) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('author', `%${author}%`)
        // .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching songs by author:", error);
        return [];
    }

    return (data as Song[]) || [];
};

export default getSongByArtistAndTracks;
