"use client";

// this is the actual player with play/pause button and forward and previous song

import { Song } from "@/types";
import PlayBarSong from "./playBarSong";
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
import { BiDotsHorizontal, BiRepeat, BiShuffle } from "react-icons/bi";
import { Bars } from "react-loader-spinner";
import SongOption from "./SongOption";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  shuffle: boolean;
  onToggleShuffle: () => void;
  repeat:boolean;
  onToggleRepeat: () => void;
}

const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlayerContent: React.FC<PlayerContentProps> = ({ 
  song, 
  songUrl,
  shuffle,
  onToggleShuffle, 
  repeat, 
  onToggleRepeat
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>("0:00");
  const [elapsedTimeShow, setElapsedTimeShow] = useState<string>("0:00");
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);

  const [playLoadVisible, setPlayLoadVisible] = useState(true);

  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const toggleDialogue = () => {
    setIsDialogueOpen(!isDialogueOpen);
  };

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

    function getRandomSingleDigit() {
      return Math.floor(Math.random() * player.ids.length); // Generates a random integer between 0 and 9
    }
    

    if(shuffle){
      const nextSong = player.ids[currentIndex + getRandomSingleDigit()];
      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
  
      player.setId(nextSong);

    }
    
    else if(repeat){
      const nextSong = player.ids[currentIndex];
      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
  
      player.setId(nextSong);

    }

    else{
      const nextSong = player.ids[currentIndex + 1];
      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
  
      player.setId(nextSong);
    }

  };


  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    function getRandomSingleDigit() {
      return Math.floor(Math.random() * player.ids.length); // Generates a random integer between 0 and 9
    }
    

    if(shuffle){
      const nextSong = player.ids[currentIndex + getRandomSingleDigit()];
      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
  
      player.setId(nextSong);

    }
    
    else if(repeat){
      const nextSong = player.ids[currentIndex];
      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
  
      player.setId(nextSong);
      
    }

    else{
      const nextSong = player.ids[currentIndex - 1];
      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
  
      player.setId(nextSong);
    }

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
        setPlayLoadVisible(false);
        onPlayNext();
      });

      // Autoplay when audio is ready
      audio.play().then(() => {
        setIsPlaying(true);
        setPlayLoadVisible(true);
      }).catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, [songUrl, volume, isMuted]);

  const handlePlay = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setPlayLoadVisible(true);
    } else {
      audioRef.current?.pause();
      setPlayLoadVisible(false);
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
      setPlayLoadVisible(true);
    }

    // Restore the play state if it was paused before adjusting the volume
    if (wasPausedBefore) {
      audioRef.current.pause();
      setIsPlaying(false);
      setPlayLoadVisible(false);
    }
  }
}, [isPlaying, isMuted, songUrl]);


  return (
    
    <div className="w-full h-full flex flex-col md:static relative items-center justify-end">

      <div className="absolute top-2 right-10">
            <Bars
                height="20"
                width="30"
                color="#F24171"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={playLoadVisible}
            />
      </div>

      <div id="LikeButton" className="hidden absolute left-0 md:flex justify-center items-center p-4 -top-50% -translate-y-1/2 scale-125 mb-2">
        <LikeButton songId={song.id} />
      </div>

      {/* Playbar for mobile and tabs */}
      <div className="flex h-full justify-center w-full md:hidden relative">
            <PlayBarSong data={song} />

            <div className="md:hidden absolute right-[18%] top-[24%] w-0 h-0 scale-125">
              <LikeButton songId={song.id}/>
            </div>
      </div>

      <div id="PlayBar" className="flex md:hidden w-full h-[30%] justify-center">
          <div className="h-full w-[5%] flex justify-end items-center">
            <p className="text-neutral-400 font-normal text-xs">{elapsedTimeShow}</p>
          </div>
          <div className="h-full w-[87%] flex items-center px-2">
            <PlayBar value={audioRef.current && audioRef.current.duration ? (elapsedTime / audioRef.current.duration) || 0 : 0} onChange={handlePlaybarChange} />
          </div>
          <div className="h-full w-[5%] flex justify-start items-center">
            <p className="text-neutral-400 font-normal text-xs">{duration}</p>
          </div>
      </div>
      {/* ....................... */}

      <div className="w-[92%] h-[60%] flex md:flex-row flex-col justify-between items-center relative">

        <div className="md:flex h-full w-[20%] justify-start hidden">
            <PlayBarSong data={song} />
        </div>


        <div className="flex h-full md:w-[60%] w-full justify-around items-center">

          <div>
            <BiShuffle size={23}
              onClick={onToggleShuffle}
              className={`cursor-pointer hover:text-rose-500 transition ${
                shuffle ? 'text-rose-500' : 'text-[#e0a75e]'
              }`}
            />
          </div>

          <div className="flex gap-x-10 items-center ">
            <AiFillStepBackward
              size={30}
              onClick={onPlayPrevious}
              className="text-[#e0a75e] cursor-pointer hover:text-rose-500 transition"
            />

            <div
              onClick={handlePlay}
              className="flex items-center justify-center h-11 w-11 rounded-full hover:bg-rose-500 bg-[#E0A75E] p-1 cursor-pointer transition duration-200 text-black"
            >
              <Icon size={31} />
            </div>

            <AiFillStepForward
              size={30}
              onClick={onPlayNext}
              className="text-[#e0a75e] cursor-pointer hover:text-rose-500 transition"
            />
          </div>

          <div>
            <BiRepeat size={23}
              onClick={onToggleRepeat}
              className={`cursor-pointer hover:text-rose-500 transition ${
                repeat ? 'text-rose-500' : 'text-[#e0a75e]'
              }`}
            />
          </div>

        </div>

        <div className="flex h-full w-[20%] items-center justify-between ">
          <div className="h-full w-2"></div>

          <div className="w-[120px] h-full md:flex items-center gap-x-2 hidden">
            <VolumeIcon onClick={toggleMute} className="cursor-pointer text-[#e0a75e]" size={30} />
            <Slider value={volume} onChange={handleVolumeChange} />
          </div>
          
        </div>

      </div>

      {/* Playbar for Desktop */}
      <div id="PlayBar" className="md:flex hidden w-full h-[30%] justify-center">
        <div className="h-full w-[5%] flex justify-end items-center">
          <p className="text-neutral-400 font-normal text-xs">{elapsedTimeShow}</p>
        </div>
        <div className="h-full w-[87%] flex items-center px-2">
          <PlayBar value={audioRef.current && audioRef.current.duration ? (elapsedTime / audioRef.current.duration) || 0 : 0} onChange={handlePlaybarChange} />
        </div>
        <div className="h-full w-[5%] flex justify-start items-center">
          <p className="text-neutral-400 font-normal text-xs">{duration}</p>
        </div>
      </div>
      
      <div className="absolute right-2 top-2">
          <BiDotsHorizontal onClick={toggleDialogue} className="text-[#999999] hover:text-white cursor-pointer" />
          {isDialogueOpen && <SongOption/>}
      </div>

      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default PlayerContent;
