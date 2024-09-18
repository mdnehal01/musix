import getSongsById from "@/actions/getSongsById";
import SongDetailsForPage from "@/components/songDetailsForPage";
import Header from "@/components/header";
import LikeButton from "@/components/likeButton";
import Button from "@/components/button";
import { BiShareAlt } from "react-icons/bi";
import Footer from "@/components/footer/Footer";

interface SongPageProps {
  params: {
    slug: string;
  };
}

const SongPage = async ({ params }: SongPageProps) => {
 
  const fetchedSongs = await getSongsById(params.slug);
 
  const song = fetchedSongs.length > 0 ? fetchedSongs[0] : null;
 
  // @ts-ignore
  const time = song.duration;
  const min = Math.floor(parseInt(time)/60);
  const sec = Math.floor(parseInt(time)%60);
  const formatDuration = `${min}:${sec.toString().padStart(2, '0')}`;
 
  if (!song) {
    return <div>Song not found.</div>;
  }
  
  return (
    <div
      className="
        dark:bg-[#1f1e1e8c]
        bg-[#F3F5F9]/10
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
 
      <div className="flex md:flex-row flex-col px-6 -mt-4 justify-between items-center">
        <div className="flex flex-col max-md:mt-6"> 
          <h1 className="font-extrabold text-6xl">{song.title}</h1>
          <p className="font-semibold text-2xl dark:text-[#999999] text-black">{song.author}</p>
        </div>
        <div className="flex flex-row gap-x-5">
        <p>{song.playtime}</p>
        </div>
        <div className="flex justify-between items-center gap-10 h-full max-md:mt-6">
          <p>{formatDuration}</p>
          <p>{song.release_date}</p>
          <BiShareAlt className="cursor-pointer" size={30}/>
          <LikeButton classname="scale-150" songId={song.id} />
        </div>
      </div>
      <div className="px-6 mt-4 flex md:justify-start justify-center">
        <Button className="w-60 rounded-none ">Play</Button>
      </div>
 
      {/* TODO: Show author profile avatar and make it visitable */}
 
      {/* TODO: Recommend music based on above music */}
 
      {/* TODO: Show Lyrics */}
 
      <Footer/>
    </div>
  );
};

export default SongPage;
