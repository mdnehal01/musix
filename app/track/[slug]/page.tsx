import { Song } from "@/types";
import getSongsById from "@/actions/getSongsById";
import SongDetailsForPage from "@/components/songDetailsForPage";
import Header from "@/components/header";
import LikeButton from "@/components/likeButton";
import Button from "@/components/button";
import ListItem from "@/components/listItems";

interface SongPageProps {
  params: {
    slug: string;
  };
}

const SongPage = async ({ params }: SongPageProps) => {

  const fetchedSongs = await getSongsById(params.slug);

  const song = fetchedSongs.length > 0 ? fetchedSongs[0] : null;

  if (!song) {
    return <div>Song not found.</div>;
  }

  return (
    <div
      className="
        bg-[#1f1e1e8c]
        h-full 
        w-full
        overflow-hidden
        overflow-y-auto
        px-4
      "
    >
      <Header>
        <SongDetailsForPage 
          data={song}
          songUrl={song.song_path}
        />
      </Header>
      <div className="flex px-6 -mt-4 justify-between items-center">
        <div className="flex flex-col"> 
          <h1 className="font-extrabold text-6xl">{song.title}</h1>
          <p className="font-semibold text-2xl text-[#999999]">{song.author}</p>
        </div>
        
        <div className="scale-150 flex items-center h-full">
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="px-6 mt-4">
        <Button className="w-60 rounded-none ">Play</Button>
      </div>
      
    </div>
  );
};

export default SongPage;




