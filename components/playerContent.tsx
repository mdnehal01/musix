"use client";

import { Song } from "@/types";
import MediaItem from "./mediaItem";
import LikeButton from "./likeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark, HiOutlineSpeakerWave } from "react-icons/hi2";
import Slider from "./slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState, useRef, useCallback } from "react";

// @ts-ignore
import useSound from "use-sound";
import PlayBar from "./playBar";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>("0:00");
  const [elapsedTimeShow, setElapsedTimeShow] = useState<string>("0:00");
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  let VolumeIcon = HiSpeakerWave;
  if (isMuted) {
    VolumeIcon = HiSpeakerXMark;
  } else if (volume === 1) {
    VolumeIcon = HiSpeakerWave;
  } else {
    VolumeIcon = HiOutlineSpeakerWave;
  }

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.src = songUrl;
      audio.volume = isMuted ? 0 : volume;
      audio.addEventListener("loadedmetadata", () => {
        setDuration(formatDuration(audio.duration));
      });
      audio.addEventListener("timeupdate", () => {
        setElapsedTime(audio.currentTime);
        setElapsedTimeShow(formatDuration(audio.currentTime));
      });
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        onPlayNext();
      });

      // Autoplay when audio is ready
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, [songUrl, volume, isMuted]);

  const handlePlay = () => {
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = useCallback(() => {
    setVolume((prevVolume) => (prevVolume === 0 ? 1 : 0));
    setIsMuted((prevMuted) => !prevMuted);
  }, []);
  
  
  

  const handlePlaybarChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value * audioRef.current.duration;
    }
  };


  const handleVolumeChange = useCallback((value: number) => {
  setVolume(value);
  if (audioRef.current) {
    audioRef.current.volume = isMuted ? 0 : value;
    const currentTime = audioRef.current.currentTime;
    const isAudioPlaying = !audioRef.current.paused;
    const wasPausedBefore = !isPlaying;

    audioRef.current.src = songUrl;
    audioRef.current.volume = isMuted ? 0 : value;
    audioRef.current.currentTime = currentTime;

    // Resume playing if it was playing before adjusting the volume
    if (isAudioPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }

    // Restore the play state if it was paused before adjusting the volume
    if (wasPausedBefore) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
}, [isPlaying, isMuted, songUrl]);


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* Mobile and medium screen's view */}
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <AiFillStepBackward
          size={30}
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer hover:text-rose-500 transition"
        />

        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-rose-500 hover:opacity-75 p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>

        <AiFillStepForward
          size={30}
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-rose-500 transition"
        />
      </div>

      {/* Desktop view */}
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={30}
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer hover:text-rose-500 transition"
        />

        <div
          onClick={handlePlay}
          className="flex items-center h-10 w-10 rounded-full bg-transparent hover:bg-white border-2 border-white p-1 cursor-pointer transition text-white hover:text-black"
        >
          <Icon size={30} />
        </div>

        <AiFillStepForward
          size={30}
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-rose-500 transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={24} />
          <Slider value={volume} onChange={handleVolumeChange} />
        </div>
      </div>

      {/* Music time slider */}
      <div className="w-5/6 h-1 absolute md:-top-2 -top-4 left-2/4 -translate-x-2/4 flex justify-between items-baseline">
        <div className="w-14 h-full flex justify-end pr-2">
          <p className="text-neutral-400 font-normal text-xs">{elapsedTimeShow}</p>
        </div>
        {/* <PlayBar value={elapsedTime / audioRef.current?.duration || 0} onChange={handlePlaybarChange} /> */}
        <PlayBar value={audioRef.current && audioRef.current.duration ? (elapsedTime / audioRef.current.duration) || 0 : 0} onChange={handlePlaybarChange} />

        <div className="w-14 h-full flex justify-start pl-2">
          <p className="text-neutral-400 font-normal text-xs">{duration}</p>
        </div>
      </div>

      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default PlayerContent;
