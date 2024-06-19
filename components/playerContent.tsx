"use client";

import { Song } from "@/types";
import MediaItem from "./mediaItem";
import LikeButton from "./likeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark, HiOutlineSpeakerWave } from "react-icons/hi2";
import Slider from "./slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
// @ts-ignore
import useSound from "use-sound";
import PlayBar from "./playBar";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

// to get the duration
const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [playbar, setPlaybar] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState<string>('0:00');
    const [elapsedTimeShow, setElapsedTimeShow] = useState<string>('0:00');
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const audio = new Audio(songUrl);
    audio.addEventListener('loadedmetadata', () => {
        setDuration(formatDuration(audio.duration));
    });

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    let VolumeIcon = HiSpeakerWave;
    if(volume === 0.1){
        VolumeIcon = HiSpeakerXMark;
    } else if(volume === 1){
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
    }

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
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            playbar: playbar,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload();
        }
    }, [sound]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && sound) {
                const currentTime = sound.seek(); // Get current time from the sound object
                setElapsedTime(currentTime); // Set elapsed time as number
                setElapsedTimeShow(formatDuration(sound.seek()));
                setPlaybar(currentTime / audio.duration); // Set playbar value as a fraction of currentTime to total duration
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isPlaying, sound, audio.duration]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    const handlePlaybarChange = (value: number) => {
        const newTime = value * audio.duration; // Calculate new time
        sound.seek(newTime); // Update audio playback position
        setPlaybar(value); // Update playbar state
    }

    const handleSkip = (seconds: number) => {
        const currentTime = sound.seek();
        const newTime = Math.max(0, Math.min(audio.duration, currentTime + seconds));
        sound.seek(newTime);
        setPlaybar(newTime / audio.duration);
    }

    const handleVolumeChange = (delta: number) => {
        const newVolume = Math.max(0, Math.min(1, volume + delta)); // Ensure volume stays within range [0, 1]
        setVolume(newVolume);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                handlePlay();
                event.preventDefault();
            } else if (event.code === "ArrowRight") {
                handleSkip(10);
                event.preventDefault();
            } else if (event.code === "ArrowLeft") {
                handleSkip(-10);
                event.preventDefault();
            } else if(event.code === "ArrowUp") {
                if(volume === 1) {
                    return;
                }else{
                    handleVolumeChange(0.1);
                }
            } else if(event.code === "ArrowDown") {
                if(volume === 0) {
                    alert("mute");
                    return;
                }else{
                    handleVolumeChange(-0.1);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handlePlay, handleSkip]);

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
                <AiFillStepBackward size={30}
                    onClick={onPlayPrevious}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-rose-500
                        transition
                    "
                />

                <div
                    onClick={handlePlay}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-rose-500
                        hover:opacity-75
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>

                <AiFillStepForward size={30}
                    onClick={onPlayNext}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-rose-500
                        transition
                    "
                />
            </div>

            {/* Desktop view */}
            <div className="
                hidden 
                h-full 
                md:flex 
                justify-center 
                items-center 
                w-full 
                max-w-[722px] 
                gap-x-6"
            >
                <AiFillStepBackward size={30}
                    onClick={onPlayPrevious}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-rose-500
                        transition
                    "
                />

                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        h-10
                        w-10
                        rounded-full
                        bg-transparent
                        hover:bg-white
                        border-2
                        border-white
                        p-1
                        cursor-pointer
                        transition
                        text-white
                        hover:text-black
                    "
                >
                    <Icon size={30} />
                </div>

                <AiFillStepForward size={30}
                    onClick={onPlayNext}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-rose-500
                        transition
                    "
                />
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={24}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>

            {/* Music time slider */}
            <div className="w-5/6 h-1 absolute md:-top-2 -top-4 left-2/4 -translate-x-2/4 flex justify-between items-baseline">
                <div className="w-14 h-full flex justify-end pr-2">
                    <p className="text-neutral-400 font-normal text-xs">{elapsedTimeShow}</p>
                </div>
                <PlayBar
                    value={playbar}
                    onChange={handlePlaybarChange}
                />
                <div className="w-14 h-full flex justify-start pl-2">
                    <p className="text-neutral-400 font-normal text-xs">{duration}</p>
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;
