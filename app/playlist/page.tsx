import Header from "@/components/header";
import { CgPlayList } from "react-icons/cg";
import CreatePlaylistBtn from "./components/CreatePlaylistBtn";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";
import ListItem from "@/components/listItems";
import PlayListItem from "@/components/playlistItems";
import Footer from "@/components/footer/Footer";

export const revalidate = 0;

const Playlist = async () => {
    const fetchedPlaylist = await getPlaylistByUserId();

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
                        <h1 className="text-white text-2xl font-semibold">
                            Playlists &nbsp; &nbsp;
                        </h1>
                        <CgPlayList className="mt-2" size={30}/>
                    </div>
                </div>

                <div className="w-full h-16 flex items-center">
                    <CreatePlaylistBtn/>
                </div>
            </Header>

            <div className="px-6 w-full grid h-auto mb-12 lg:grid-cols-3 gap-4 sm:grid-cols-2 grid-cols-1">
                {/* DONE fetch all the playlist by the user from database */}
                {fetchedPlaylist.map((playlist) => <PlayListItem classname="h-20" key={playlist.playlist_id} href={`/playlist/${playlist.playlist_id}`} name={playlist.playlist_name}/>)}
            </div>
            <Footer/>
        </div>
    )
}

export default Playlist;