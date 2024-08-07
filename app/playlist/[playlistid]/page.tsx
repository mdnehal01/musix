import Header from "@/components/header";
import { CgPlayList } from "react-icons/cg";
import getPlaylistById from "@/actions/getPlaylistById";
import getPlaylistSongsByIds from "@/actions/getPlaylistSongsByIds";  // New function to get songs by IDs
import PlayListItem from "@/components/playlistItems";
import { BsDot } from "react-icons/bs";
import AddSongsBtn from "./components/addSongsBtn";
import MediaItemDetailed from "@/components/mediaItemDetailed";
import MediaItem from "@/components/mediaItem";
import Footer from "@/components/footer/Footer";
import DelAndShare from "./components/DelAndShare";

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

    // @ts-ignore
    const playlistUserId = fetchedPlaylist.user_id;

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
    
    // const {user} = useUser();

    // if(!user){
    //     return;
    // }

    // TODO: Authenticated user can only play the songs

    return (
        <div 
            className="
                dark:bg-[#1f1e1e8c]
                bg-[#F3F5F9]/10
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header>
                <div className="mb-2 flex flex-col gap-y-6">
                    <div className="flex justify-between items-center">

                        <div>
                            <h1 className="dark:text-white text-neutral-900 text-8xl font-extrabold">
                                {/* @ts-ignore */}
                                {fetchedPlaylist.playlist_name} &nbsp;
                            </h1>
                            <CgPlayList className="mt-2" size={50}/>
                        </div>

                        <div id="delete&ShareIcons">
                            <DelAndShare playlistUserId={playlistUserId} playlistId={params.playlistid}/>
                        </div>
                        
                    </div>
                </div>
                <div className="flex items-center gap-x-3 mt-3">
                    <p className="text-neutral-400 text-lg">Playlist</p>
                    <BsDot size={30} className="text-neutral-400"/> 
                    <p className="text-neutral-400 text-md">{formattedDate}</p>
                </div>
                <div className="w-full h-16 flex items-center">
                    <AddSongsBtn playlistUserId={playlistUserId}/>
                </div>
            </Header>

            {/*   Fetched songs from the song playlist   */}
            <div className="p-6 max-md:hidden gap-y-2 flex flex-col">
                {songs.length > 0 ? (
                    songs.map((song) => (
                        <MediaItemDetailed key={song.id} data={song}/>
                        // TODO: Add minus sign to remove song from the playlist
                    ))
                ) : (
                    <p className="text-neutral-400">No songs in this playlist.</p>
                )}
            </div>

            <div className="p-6 md:hidden gap-y-2 flex flex-col">
                {songs.length > 0 ? (
                    songs.map((song) => (
                        <MediaItem key={song.id} data={song} />
                        // TODO: Add minus sign to remove song from the playlist
                    ))
                ) : (
                    <p className="text-neutral-400">No songs in this playlist.</p>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default PlaylistPage;
