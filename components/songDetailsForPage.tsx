"use client"

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import Button from "./button";
import { PiPlayBold } from "react-icons/pi";
import { BsPlayBtn, BsPlayFill } from "react-icons/bs";

interface SongDetailsForPageProps {
    data:Song;
    onClick?: (id:string) => void;
}

const SongDetailsForPage:React.FC<SongDetailsForPageProps> = ({
    data,
    onClick
}) => {

    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    const releaseYear = data.release_date.slice(-4);
    const time = data.duration;
    const min = Math.floor(parseInt(time)/60);
    const sec = Math.floor(parseInt(time)%60);
    const formatDuration = `${min}:${sec.toString().padStart(2, '0')}`;

    const handleClickPlay = () => {
        if(onClick) {
            return onClick(data.id);
        }

        // Default turn on player
        return player.setId(data.id);
    }

    return (
        <div 
            className="
                flex
                items-center
                gap-5
                w-full
                p-4
                rounded-md
                flex-col
            "
        >
            {/* Image starts here */}
            <div 
                className="
                    relative
                    rounded-md
                    min-h-[250px]
                    min-w-[250px]
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
            <div>
            <Button onClick={handleClickPlay} className="h-12 w-12 flex justify-center items-center">
                <BsPlayFill size={30}/>
            </Button>
            </div>
        </div>
    );
}

export default SongDetailsForPage;