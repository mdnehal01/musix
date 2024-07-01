"use client"

import { TbPlaylist } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import useUploadModel from "@/hooks/useUploadModel";
import { Song } from "@/types";
import MediaItem from "./mediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModel from "@/hooks/useSubscribeModel";

interface LibraryProps{
    children:React.ReactNode;
    className?:string;
    songs:Song[];
}

const Library:React.FC<LibraryProps> = ({children, className, songs}) => {

    const subscribeModel = useSubscribeModel();
    const authModel = useAuthModel();
    const uploadModel = useUploadModel();
    const { user, subscription } = useUser();

    const onPlay = useOnPlay(songs);

    const onClick = ()=>{
        // Handle upload
        if(!user){
            return authModel.onOpen();
        }

        // check for subscription
        if(!subscription) {
            return subscribeModel.onOpen();
        }

        return uploadModel.onOpen();
    };

    return(
        <div className="flex flex-col ">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={20}/>
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={18}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem 
                        onClick={(id:string)=>onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;