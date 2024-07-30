"use client";
// this component contains the player background just box

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./playerContent";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import useLoadImage from "@/hooks/useLoadImage";
import Draggable from "react-draggable";
import { Playlist } from "@/types";

interface PlayerProps{
    playlist: Playlist[];
    className?:string;
}

const Player:React.FC<PlayerProps> = ({
    className,
    playlist
}) => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [playerFullScreen, setPlayerFullScreen] = useState(false);
    const [playerMinimize, setPlayerMinimize] = useState(false);
    const songUrl = useLoadSongUrl(song!);
    const imgUrl = useLoadImage(song!);

    const toggleShuffle = () => {
        setShuffle((prevShuffle) => !prevShuffle);
        setRepeat(false);
    };

    const toggleRepeat = () => {
        setRepeat((prevRepeat) => !prevRepeat);
        setShuffle(false);
    }

    // const playerBackgroundHeight = !playerHeight ? "h-[125px] w-full" : "h-full w-full";
    // const playerBackgroundWidth = playerMinimize ? "w-[50px] h-[50px]" : "w-full h-[50px]"
    const fullScreenPlayer = !playerFullScreen ? "md:h-[125px] h-[35%]" : "md:h-[100%] h-[100%]";
    const hiddenPlayer = playerMinimize ? "hidden" : "flex";

    let minimizedPlayer = playerMinimize ? "md:h-[50px] h-[50px] w-[50px] pt-0 px-0 py-0 animate-spin-slow absolute bottom-[20px] right-[20px] rounded-full border-2 border-rose-500 cursor-pointer shadow-lg" : "";

    const fullScreen = () => {
        setPlayerFullScreen((prevPlayerFullScreen) => !prevPlayerFullScreen);
    }
    
    const minimize = () => {
        setPlayerMinimize((prevWidth)=> !prevWidth);
    }
    
    const onclick = () => {
        if(!playerMinimize){
            return;
        }else{
            setPlayerMinimize(false);
        }
    }

    if(!song || !songUrl || !player.activeId) {
        return null;
    } 

    return (
        // <Draggable disabled={!playerMinimize}>
        <div 
            className={twMerge(`
                dark:bg-[#0F0F0F]/80
                bg-[#ffffff]
                relative
                w-full
                py-2
                ${fullScreenPlayer}
                px-4
                md:pt-0
                pt-7
            `, minimizedPlayer)}

            onClick={onclick}
        >
            {playerMinimize ? (
                // @ts-ignore
                <img src={imgUrl} width="100%" className="object-contain rounded-full"/>
            ) : (
                <></>
            )}
            
            <PlayerContent
                playlist={playlist}
                classname={hiddenPlayer}
                key={songUrl}
                song={song}
                songUrl={songUrl}
                shuffle={shuffle}
                onToggleShuffle={toggleShuffle}
                repeat={repeat}
                onToggleRepeat={toggleRepeat}
                onFullScreen={fullScreen}
                onMinimize={minimize}
            />
        </div>
        // </Draggable>
    );
}

export default Player;