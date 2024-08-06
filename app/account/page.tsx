import Header from "@/components/header";
import AccountContent from "@/components/accountContent";
import ListItem from "@/components/listItems";
import Footer from "@/components/footer/Footer";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";
import PlayListItem from "@/components/playlistItems";

const Account = async () => {
  const fetchedPlaylist = await getPlaylistByUserId();
  return (
    <div 
      className="
      dark:bg-[#1f1e1e8c]
      bg-[#F3F5F9]/10
      h-full 
      w-full 
      overflow-hidden 
      overflow-y-auto"
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-2xl font-semibold dark:text-white text-rose-500">
            Account Settings
          </h1>
        </div>
      </Header>
      
      <AccountContent/>
      
      <p className="px-6 text-xl font-bold py-3">Playlists</p>
      <div className="px-6 w-full grid h-auto mb-12 lg:grid-cols-3 gap-4 sm:grid-cols-2 grid-cols-1">
          {/* DONE fetch all the playlist by the user from database */}
          {fetchedPlaylist.map((playlist) => <PlayListItem classname="h-20" key={playlist.playlist_id} href={`/playlist/${playlist.playlist_id}`} name={playlist.playlist_name}/>)}
      </div>

      <Footer/>
    </div>
  );
}

export default Account;