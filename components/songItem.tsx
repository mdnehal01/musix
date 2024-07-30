// This is the Song Block which contains Image Author and Duration 

"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import "./box.module.css";


interface SongItemProps {
    data: Song;
    onClick: (id:string) => void
};

const SongItem:React.FC<SongItemProps> = ({
    data,
    onClick
}) => {

    const imagePath = useLoadImage(data);{data.duration}
    const time = data.duration;
    const min = Math.floor(parseInt(time)/60);
    const sec = Math.floor(parseInt(time)%60);
    const formatDuration = `${min}:${sec.toString().padStart(2, '0')}`;
    

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
                        className="object-cover hover:scale-[1.15] hover: transition duration-200"
                        src={imagePath || '/images/liked.png'}
                        fill
                        alt="Image"
                    />
                </div>
            </div>

            <div className="flex items-start justify-between w-full pt-2 gap-y-1">
                <div className="flex flex-col w-3/4">
                    <p className="truncate w-full font-semibold text-sm">
                        {data.title}
                    </p>
                    <p className="dark:text-neutral-400 text-neutral-800 font-medium pb-4 truncate w-full text-xs">
                        {data.author}
                    </p>
                </div>
                <div className="flex">
                    <p className="dark:text-[#999999] text-neutral-800 font-medium text-sm">{formatDuration}</p>
                </div>
            </div>

        </div>
    )
}

export default SongItem;