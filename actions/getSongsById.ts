import { Song } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongsById = async (id: string): Promise<Song[]> => {
    const supabase = createClientComponentClient();

    if (!id) {
        return [];
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('id', id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching songs by ID:", error);
        return [];
    }
    return (data as Song[]) || [];
};

export default getSongsById;
