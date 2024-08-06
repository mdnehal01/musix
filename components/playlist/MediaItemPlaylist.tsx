"use client"

import useLoadImage from "@/hooks/useLoadImage";
import useLoadImageSongID from "@/hooks/useLoadImageSongId";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface MediaItemProps {
    songAuthor:string;
    songName:string;
    songImgUrl:string;
}

const MediaItemPlaylist:React.FC<MediaItemProps> = ({
    songAuthor,
    songName,
    songImgUrl,
}) => {

    if(!songImgUrl.startsWith("https://storage.googleapis.com")){
        songImgUrl = `https://kezskricfbuksihuhhqt.supabase.co/storage/v1/object/public/images/${songImgUrl}`;
    }

    return (
        <div 
            className="
                flex
                items-center
                gap-x-3
                cursor-pointer
                dark:hover:bg-neutral-800/50
                hover:bg-white
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
                    src={songImgUrl || '/images/liked.png'}
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
                <div className="flex flex-col">
                    <p className="dark:text-white font-medium text-neutral-950 text-sm truncate">
                        {songName}
                    </p>
                    <p className="dark:text-neutral-400 text-neutral-800 text-xs truncate">
                        {songAuthor}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MediaItemPlaylist;