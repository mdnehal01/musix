import Header from "@/components/header";
import { CgPlayList } from "react-icons/cg";
import getPlaylistById from "@/actions/getPlaylistById";
import getPlaylistSongsByIds from "@/actions/getPlaylistSongsByIds";  // New function to get songs by IDs
import PlayListItem from "@/components/playlistItems";
import { BsDot } from "react-icons/bs";
import AddSongsBtn from "./components/addSongsBtn";
import MediaItemDetailed from "@/components/mediaItemDetailed";

interface PlaylistPageProps {
    params: {
      playlistid: string;
    };
}

export const revalidate = 0;

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
    const fetchedPlaylist = await getPlaylistById(params.playlistid);
    // @ts-ignore
    let createdAt = fetchedPlaylist.created_at;

    // Extract the date part (YYYY-MM-DD)
    const datePart = createdAt.split('T')[0];

    // Function to format date to a more readable string
    function formatDate(dateString: string) {
        const date = new Date(dateString);

        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getUTCFullYear();

        const daySuffix = (day: number) => {
            if (day > 3 && day < 21) return 'th'; // 4th-20th
            switch (day % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        };

        return `${day}${daySuffix(day)} ${month} ${year}`;
    }

    // Generate the formatted date string
    const formattedDate = formatDate(datePart);

    // Fetch songs using the song IDs in the playlist
    // @ts-ignore
    const songIds = fetchedPlaylist.song_id || [];
    const songs = songIds.length ? await getPlaylistSongsByIds(songIds) : [];

    return (
        <div 
            className="
                bg-[#1f1e1e8c] 
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header>
                <div className="mb-2 flex flex-col gap-y-6">
                    <div className="flex justify-start items-center">
                        <h1 className="text-white text-8xl font-extrabold">
                            {/* @ts-ignore */}
                            {fetchedPlaylist.playlist_name} &nbsp;
                        </h1>
                        <CgPlayList className="mt-2" size={50}/>
                    </div>
                </div>
                <div className="flex items-center gap-x-3 -mt-3">
                    <p className="text-neutral-400 text-lg">Playlist</p>
                    <BsDot size={30} className="text-neutral-400"/> 
                    <p className="text-neutral-400 text-md">{formattedDate}</p>
                </div>
                <div className="w-full h-16 flex items-center">
                    <AddSongsBtn/>
                </div>
            </Header>

            {/*   Fetched songs from the song playlist   */}
            <div className="p-6">
                {songs.length > 0 ? (
                    songs.map((song) => (
                        <MediaItemDetailed data={song} />
                    ))
                ) : (
                    <p className="text-neutral-400">No songs in this playlist.</p>
                )}
            </div>
        </div>
    );
}

export default PlaylistPage;
