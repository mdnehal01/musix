"use client"

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

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
                md:flex-row
                flex-col
                items-center
                cursor-pointer
                w-full
                md:gap-3
                md:text-left
                text-center
            "
        >
            {/* Image starts here */}
            <div 
                className="
                    relative
                    md:h-[65px]
                    md:w-[65px]
                    w-[100px]
                    h-[100px]
                    overflow-hidden
                    flex
                    flex-shrink-0
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

                <p className="text-white text-base truncate" onClick={()=>router.push(`/track/${data.id}`)}>
                    {data.title}
                </p>

                {/* TODO: Clicking on author opens Author's profile */}
                <p className="text-neutral-400 text-xs truncate">
                    {data.author}
                </p>
                
            </div>
        </div>
    );
}

export default PlayBarSong;