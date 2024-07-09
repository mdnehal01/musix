"use client"

// The playlist component Liked Songs playlist button

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import useAuthModel from "@/hooks/useAuthModel";
import { RxCountdownTimer } from "react-icons/rx";
import { Bars } from "react-loader-spinner";

interface PlayListItemProps{
    name:string;
    href:string;
    classname?:string;
}

const PlayListItem:React.FC<PlayListItemProps> = ({name, href, classname}) => {

    const router = useRouter();
    const { user } = useUser();
    const authModel = useAuthModel();
    const onClick = () => {
        // Add auth before push
        if(!user){
            return authModel.onOpen();
        }

        router.push(href)
    }

    return(
        <button
        onClick={onClick}
        className={twMerge(`
            relative
            group 
            flex 
            items-center 
            justify-center
            rounded-md 
            overflow-hidden 
            gap-x-4 
            bg-neutral-500/30
            transition 
            duration-200
            p-1
        `, classname)}>
            <div className="hover:bg-rose-900/80 transition duration-200 flex items-center justify-center h-full w-full">
                <p className="truncate font-medium py-5">{name}</p>
                <div 
                    className="
                        absolute 
                        transition 
                        opacity-0 
                        rounded-full 
                        bg-neutral-800
                        flex 
                        items-center 
                        justify-center 
                        p-3
                        drop-shadow-md 
                        right-5 
                        group-hover:opacity-100 
                        hover:scale-110
                    "
                >  
                {/* SongCount  */}
                    <Bars
                        height="20"
                        width="20"
                        color="#F24171"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </button>
    );
}

export default PlayListItem;