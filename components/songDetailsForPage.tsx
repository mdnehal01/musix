"use client";

// USED by page.tsx of track/[slug]/page.tsx

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import Button from "./button";
import { FaPause, FaPlay } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useUser } from "@/hooks/useUser";
import useAuthModel from "@/hooks/useAuthModel";

interface SongDetailsForPageProps {
  data: Song;
  onClick?: (id: string) => void;
  songUrl: string;
}

const SongDetailsForPage: React.FC<SongDetailsForPageProps> = ({
  data,
  songUrl,
  onClick,
}) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);
  const releaseYear = data.release_date.slice(-4);
  const time = data.duration;
  const min = Math.floor(parseInt(time) / 60);
  const sec = Math.floor(parseInt(time) % 60);
  const formatDuration = `${min}:${sec.toString().padStart(2, "0")}`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const PlayPauseIcon = !isPlaying ? FaPlay : FaPause;
  const { user } = useUser()
  const authModel = useAuthModel();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songUrl;
    }
  }, [songUrl]);

  const handleClickPlay = () => {
    if(!user){
      return authModel.onOpen();
    } 
    player.setId(data.id)
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-5
        md:h-[300px]
        h-[200px]
        w-[200px]
        md:w-full
        overflow-hidden
        bg-center
        rounded-lg
        bg-no-repeat
        bg-cover
        left-1/2
        -translate-x-1/2
        relative
      "
    >
      {/* {!isImageLoaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/10">
          <Bars color="#00BFFF" height={80} width={80} />
        </div>
      )} */}

      <Image
        src={imageUrl || "/images/liked.png"}
        alt="Media Item"
        layout="fill"
        className="object-cover z-0"
        onLoadingComplete={() => setIsImageLoaded(true)}
        // style={{ display: isImageLoaded ? "block" : "none" }}
      />

      <div
        className="w-full h-full rounded-none flex justify-center items-center bg-black/15 hover:bg-black/80 transition duration-200 cursor-pointer absolute top-0 left-0 z-10"
        onClick={handleClickPlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && <PlayPauseIcon size={50} className="text-white" />}
      </div>

    </div>
  );
};

export default SongDetailsForPage;
