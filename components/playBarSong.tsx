"use client"

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";

interface PlayBarSongProps {
    data:Song;
    onClick?: (id:string) => void;
}

const PlayBarSong:React.FC<PlayBarSongProps> = ({
    data,
    onClick
}) => {

    const player = usePlayer();
    const imageUrl = useLoadImage(data);

    const handleClick = () => {
        if(onClick) {
            return onClick(data.id);
        }

        // Default turn on player
        return player.setId(data.id);
    }

    return (
        <div 
            onClick={handleClick}
            className="
                flex
                cursor-pointer
                w-full
                md:gap-3
            "
        >
            {/* Image starts here */}
            <div 
                className="
                    relative
                    h-[65px]
                    w-[65px]
                    overflow-hidden
                "
            > 
                <Image 
                    className="object-cover"
                    fill
                    alt="Media Item"
                    src={imageUrl || '/images/liked.png'}
                />
            </div>

            <div className="
                flex
                flex-col
                overflow-hidden
                justify-end
                mb-[5px]
            ">

                <p className="text-white text-base truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-xs truncate">
                    {data.author}
                </p>
                
            </div>

        </div>
    );
}

export default PlayBarSong;