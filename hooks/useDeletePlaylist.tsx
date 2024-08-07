import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const useDeletePlaylist = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const delPlaylistById = async (playlist_id: string) => {
        if (!playlist_id) {
            return [];
        }

        const { error } = await supabase
            .from('playlist')
            .delete()
            .eq('playlist_id', playlist_id);

        if (error) {
            console.error("Error deleting playlist by ID:", error);
            return [];
        }

        router.push('/playlist'); // Redirect to the playlist page after deletion
    };

    return delPlaylistById;
};

export default useDeletePlaylist;
