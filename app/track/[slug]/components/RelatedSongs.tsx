"use client"
import { useState } from "react";
import MediaItemDetailed from "@/components/mediaItemDetailed"; // Ensure this is correctly imported
import { Song } from "@/types";
import MediaItem from "@/components/mediaItem";

interface RelatedSongsProps {
  relatedSongs: Song[];  // Assuming `Song` is your song type
}

const RelatedSongs = ({ relatedSongs }: RelatedSongsProps) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(prev => !prev);
  };

  const displayedSongs = showMore ? relatedSongs.slice(0,10) : relatedSongs.slice(0, 5);

  return (
    <>
      {relatedSongs.length > 0 && (
        <div className="px-6 mt-16">
          <h2 className="md:text-2xl text-xl font-extrabold">
            More songs by this artist:
          </h2>
          <ul className="mt-4">
            {displayedSongs.map((relatedSong, index) => (
              <div key={index}>
                <div className="max-md:hidden">
                    <MediaItemDetailed data={relatedSong} />
                </div>
                <div className="md:hidden">
                    <MediaItem data={relatedSong} />
                </div>
              </div>
            ))}
          </ul>
          {relatedSongs.length > 5 && (
            // <button
            //   onClick={toggleShowMore}
            //   className="mt-4 text-blue-500 hover:underline"
            // >
            //   {showMore ? "Show Less" : "Show More"}
            // </button>
            <button onClick={toggleShowMore} className="bg-rose-500 text-white py-2 px-5 cursor-pointer rounded-md hover:pr-20 transition-all duration-300 mt-2">
                {showMore ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default RelatedSongs;