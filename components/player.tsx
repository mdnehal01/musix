"use client";
// this component contains the player background just box

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./playerContent";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

interface PlayerProps{
    className?:string;
}

const Player:React.FC<PlayerProps> = ({
    className
}) => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const songUrl = useLoadSongUrl(song!);

    const toggleShuffle = () => {
        setShuffle((prevShuffle) => !prevShuffle);
        setRepeat(false);
    };

    const toggleRepeat = () => {
        setRepeat((prevRepeat) => !prevRepeat);
        setShuffle(false);
    }

    if(!song || !songUrl || !player.activeId) {
        return null;
    } 

    return (
        <div 
            className={twMerge(`
                bg-[#0F0F0F]/80
                relative
                w-full
                py-2
                md:h-[125px]
                h-[35%]
                px-4
                md:pt-0
                pt-7
            `, className)}
        >
            
            <PlayerContent
                key={songUrl}
                song={song}
                songUrl={songUrl}
                shuffle={shuffle}
                onToggleShuffle={toggleShuffle}
                repeat={repeat}
                onToggleRepeat={toggleRepeat}
            />
        </div>
    );
}

export default Player;