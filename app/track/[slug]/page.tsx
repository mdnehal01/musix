import { Song } from "@/types";
import getSongsById from "@/actions/getSongsById";
import SongDetailsForPage from "@/components/songDetailsForPage";
import Header from "@/components/header";

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
    <div>
      <Header><></></Header>
      <SongDetailsForPage 
        data={song}
      />
    </div>
  );
};

export default SongPage;
