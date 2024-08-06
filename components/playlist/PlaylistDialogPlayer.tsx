// This is playlist dialogue when clicked on the music image while player is on

import { CgClose } from "react-icons/cg";
import { Playlist } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import AddToPlaylistBtn from "@/components/playlist/AddToPlaylistBtn";
import MediaItem from "./MediaItemPlaylist";
import MediaItemPlaylist from "./MediaItemPlaylist";
import CreatePlaylistBtn from "@/app/playlist/components/CreatePlaylistBtn";


interface PlaylistDialoguePlayerProps {
    playlist: Playlist[];
    className?:string;
    songName?: string;
    songAuthor?:string;
    songId: string | null;
    songImage:string;
    songUrl: string; 
    isOpen: boolean;
    onClose: () => void;
}

const PlaylistDialoguePlayer: React.FC<PlaylistDialoguePlayerProps> = ({songAuthor, songName, songId, songImage, songUrl,isOpen, onClose, playlist, className }) => { // Default value for playlist
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
            <div className="absolute w-[500px] h-[600px] z-50 dark:bg-neutral-900 overflow-scroll scrollbar-none bg-slate-100 bottom-0 md:bottom-20 rounded-lg p-3">
                <button onClick={onClose} className="absolute top-5 right-5">
                    <CgClose />
                </button>
                <div>
                    <h1 className="dark:text-white/80 text-black text-xl mb-6">
                        Add to playlist
                    </h1>

                    {songId && (
                        // @ts-ignore
                        <MediaItemPlaylist songId={songId} songAuthor={songAuthor} songImgUrl={songImage} songName={songName}/>
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
                                    dark:hover:bg-neutral-500/10
                                    hover:bg-white
                                    cursor-pointer"
                                key={playlistsingle.playlist_id}
                                // onClick={() => songIDinSongArray(playlistsingle.playlist_id)}
                            >
                                <p className="text-lg font-bold">{playlistsingle.playlist_name}</p>
                                <AddToPlaylistBtn onClick={() => songIDinSongArray(playlistsingle.playlist_id)} />
                            </div>)}
                    </div>
                </div>
                <br />
                <center>
                <CreatePlaylistBtn/>
                </center>
                
            </div>
    );
};

export default PlaylistDialoguePlayer;
