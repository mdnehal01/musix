"use client"

// The playlist component Liked Songs playlist button

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import useAuthModel from "@/hooks/useAuthModel";
import { RxCountdownTimer } from "react-icons/rx";

interface ListItemProps{
    image:string;
    name:string;
    href:string;
    classname?:string;
}

const ListItem:React.FC<ListItemProps> = ({image, name, href, classname}) => {

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
            rounded-md 
            overflow-hidden 
            gap-x-4 
            bg-neutral-100/10 
            hover:bg-neutral-100/20 
            transition 
            pr-4
        `, classname)}>
            <div className="relative min-h-full min-w-[50%]">
                <Image 
                    className="object-cover " 
                    fill
                    src={image}
                    alt="Image"
                />
            </div>
            <p className="truncate font-medium py-5">{name}</p>
            <div 

                className="
                    absolute 
                    transition 
                    opacity-0 
                    rounded-full 
                    flex 
                    items-center 
                    justify-center 
                  bg-rose-500 
                    p-3
                    drop-shadow-md 
                    right-5 
                    group-hover:opacity-100 
                    hover:scale-110
                "
            >  
                SongCount 
            </div>
        </button>
    );
}

export default ListItem;