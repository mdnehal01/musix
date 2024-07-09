import { CgClose } from "react-icons/cg";
import { Playlist } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import AddToPlaylistBtn from "@/components/playlist/AddToPlaylistBtn";

interface PlaylistDialogueProps {
    playlist: Playlist[];
    songId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const PlaylistDialogue: React.FC<PlaylistDialogueProps> = ({ songId, isOpen, onClose, playlist }) => {
    const supabaseClient = createClientComponentClient();
    if (!isOpen) return null;

    const songIDinSongArray = async (playlistId: string) => {
        if (!songId) return;

        const { data, error } = await supabaseClient
            .from('playlist')
            .select('song_id')
            .eq('playlist_id', playlistId)
            .single();

        console.log(data)

        if (error) {
            toast.error(error.message);
            return;
        }

        const updatedSongs = data.song_id ? [...data.song_id, songId] : [songId];

        const { error: updateError } = await supabaseClient
            .from('playlist')
            .update({ song_id: updatedSongs })
            .eq('playlist_id', playlistId);

        if (updateError) {
            toast.error(updateError.message);
        } else {
            toast.success('Song added to playlist!');
        }
    };

    return (
        <div className="absolute h-full w-full backdrop-blur-md top-0 left-0 z-50">
            <div className="md:p-12 p-3 max-md:pt-5 bg-neutral-800/90 rounded-md md:top-[50%] md:left-[50%] md:-translate-y-[50%] md:-translate-x-[50%] md:h-2/3 md:w-1/2 h-full w-full md:relative">
                <button onClick={onClose} className="absolute top-5 right-5">
                    <CgClose />
                </button>
                <div>

                    <h1 className="text-white/80 text-xl">
                        Add to playlist
                    </h1>

                    {songId && (
                        <p>Adding song to playlist with ID: {songId}</p>
                    )}
                    <div className="mt-10">
                        {playlist.map((playlistsingle) =>
                            <div
                                className="
                                    w-full 
                                    h-14 
                                    flex 
                                    items-center 
                                    px-5 
                                    rounded-md 
                                    justify-between
                                    hover:bg-neutral-500/10 
                                    cursor-pointer"
                                key={playlistsingle.playlist_id}
                                // onClick={() => songIDinSongArray(playlistsingle.playlist_id)}
                            >
                                <p className="text-white text-lg font-bold">{playlistsingle.playlist_name}</p>
                                <AddToPlaylistBtn onClick={() => songIDinSongArray(playlistsingle.playlist_id)} />
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistDialogue;
