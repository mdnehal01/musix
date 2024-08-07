"use client"

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    data:Song;
    onClick?: (id:string) => void;
}

const MediaItem:React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {

    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    const time = data.duration;
    const min = Math.floor(parseInt(time)/60);
    const sec = Math.floor(parseInt(time)%60);
    const formatDuration = `${min}:${sec.toString().padStart(2, '0')}`;

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
                items-center
                gap-x-3
                cursor-pointer
                dark:hover:bg-neutral-800/50
                hover:bg-neutral-200
                w-full
                p-2
                rounded-md
            "
        >
            {/* Image starts here */}
            <div 
                className="
                    relative
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
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
                flex-row
                w-full
                justify-between
                gap-y-1
                overflow-hidden
                items-center
            ">
                <div className="flex flex-col w-32">
                    <p className="dark:text-white font-medium text-neutral-950 text-sm truncate">
                        {data.title}
                    </p>
                    <p className="dark:text-neutral-400 text-neutral-800 text-xs truncate">
                        {data.author}
                    </p>
                </div>
                <div className="">
                    <p className="dark:text-[#999999] text-black font-medium text-sm">{formatDuration}</p>
                </div>
                
            </div>
        </div>
    );
}

export default MediaItem;