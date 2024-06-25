"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import "./box.module.css";
import PlayButton from "./playButton";
import LikeButton from "./likeButton";

const smallText = {
    fontSize:"10px",
    textAlign:"left"
}

interface SongItemProps {
    data: Song;
    onClick: (id:string) => void
};

const SongItem:React.FC<SongItemProps> = ({
    data,
    onClick
}) => {

    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                cursor-pointer
                transition
            
            "
        >   
            <div className="p-[3px] w-full h-full rounded-md flex justify-center items-center bg-gradient-to-br from-[#F61111] via-[#0037c1] to-[#03A823] transition duration-200">
                <div 
                    className="
                        relative
                        aspect-square
                        w-full
                        h-full
                        rounded-md
                        overflow-hidden
                        transition
                        duration-200
                    "
                >
                    <Image 
                        className="object-cover"
                        src={imagePath || '/images/liked.png'}
                        fill
                        alt="Image"
                    />
                </div>
            </div>

            <div className="flex flex-col items-start w-full pt-2 gap-y-1">
                <p className="font-normal truncate w-full text-sm">
                    {data.title}
                </p>
                <p className="text-neutral-400 pb-4 truncate w-full text-xs">
                    {data.author}
                </p>
            </div>

            {/* <div className="absolute bottom-24 right-5">
                <PlayButton/>
            </div> */}

        </div>
    )
}

export default SongItem;