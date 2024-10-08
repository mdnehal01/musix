import getSongsById from "@/actions/getSongsById";
import getSongByArtistAndTracks from "@/actions/getSongsByArtistAndTrack";
import SongDetailsForPage from "@/components/songDetailsForPage";
import Header from "@/components/header";
import LikeButton from "@/components/likeButton";
import Button from "@/components/button";
import { BiShareAlt } from "react-icons/bi";
import Footer from "@/components/footer/Footer";
import Lyrics from "./components/Lyrics";
import { recommendSongs } from "./hooks/getSongsRecommendation";
import MediaItemDetailed from "@/components/mediaItemDetailed";
import RelatedSongs from "./components/RelatedSongs";

interface SongPageProps {
  params: {
    slug: string;
  };
}

const SongPage = async ({ params }: SongPageProps) => {
  const fetchedSongs = await getSongsById(params.slug);
  const song = fetchedSongs.length > 0 ? fetchedSongs[0] : null;

  // Fetch recommendations
  const recommendations = song ? await recommendSongs(song.title, song.author) : null;

  // Fetch songs from Supabase
  const relatedSongs = song ? await getSongByArtistAndTracks(song.author, song.title) : [];

  // Format duration
  const time = song?.duration;
  // @ts-ignore
  const min = Math.floor(parseInt(time) / 60);
  // @ts-ignore
  const sec = Math.floor(parseInt(time) % 60);
  const formatDuration = `${min}:${sec.toString().padStart(2, '0')}`;

  if (!song) {
    return <div>Song not found.</div>;
  }

  const releaseYear = song.release_date.slice(-4);

  return (
    <>
      <div className="dark:bg-[#1f1e1e8c] bg-[#F3F5F9]/10 h-full w-full overflow-hidden overflow-y-auto">
        <Header>
          <SongDetailsForPage data={song} songUrl={song.song_path} />
        </Header>

        <div className="flex md:flex-row flex-col px-6 justify-between items-center">
          <div className="flex flex-col max-md:mt-6"> 
            <h1 className="font-extrabold md:text-6xl sm:text-4xl text-2xl">{song.title}</h1>
            <p className="font-semibold md:text-2xl sm:text-xl text-sm dark:text-[#999999] text-black">{song.author}</p>
          </div>
          <div className="flex flex-row md:gap-x-5 gap-x-2">
            <p className="text-sm md:text-md md:mt-0 mt-6">{song.playtime}</p>
          </div>
          <div className="flex justify-between md:text-md text-sm items-center gap-10 h-full max-md:mt-6">
            <p>{formatDuration}</p>
            <p className="hidden md:block">{song.release_date}</p>
            <p className="md:hidden block">{releaseYear}</p>
            <BiShareAlt className="cursor-pointer lg:scale-[1.8] md:scale-[1.5] scale-[1.25]" />
            <LikeButton classname="lg:scale-125 md:scale-125 scale-105" songId={song.id} />
          </div>
        </div>

        <div className="px-6 mt-4 flex md:justify-start justify-center">
          <Button className="w-60 rounded-none md:flex hidden">Play</Button>
        </div>

        {song.lyrics && (
          <div>
            <p className="px-6 mt-16 md:text-2xl text-xl font-extrabold">Lyrics</p>
            <br />
            <Lyrics text={song.lyrics} />
          </div>
        )}

        {/* Show Recommendations */}
        {recommendations && recommendations.recommendations.length > 0 && (
          <div className="px-6 mt-16">
            <h2 className="md:text-2xl text-xl font-extrabold">Recommended Songs:</h2>
            <ul className="mt-4">
              {recommendations.recommendations.map((track, index) => (
                <li key={index} className="text-lg">{track.name} by {track.artists.join(', ')}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Show Related Songs */}
        <RelatedSongs relatedSongs={relatedSongs}/>

        <Footer />
      </div>
    </>
  );
};

export default SongPage;
