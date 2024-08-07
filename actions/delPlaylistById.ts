"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

const delPlaylistById = async (playlist_id: string) => {
    const supabase = createClientComponentClient();

    if (!playlist_id) {
        return [];
    }

    const { error } = await supabase
        .from('playlist')
        .delete()
        .eq('playlist_id', playlist_id)
        

    if (error) {
        console.error("Error deleting playlist by ID:", error);
        return [];
    }

    toast.success("Playlist Deleted")
    // Redirect to the playlist page after deletion
    window.location.href = '/playlist';


};

export default delPlaylistById;
