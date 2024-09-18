import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface BottomBarItemsProps{
    icon:IconType;
    label:string;
    active?:boolean;
    href:string;
}

const BottomBarItems:React.FC<BottomBarItemsProps> = ({icon:Icon, label, active, href}) => {

    return(
        <Link href={href} className={twMerge(
            `flex flex-row justify-center h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] dark:hover:text-rose-400 hover:text-rose-400 dark:text-neutral-400 text-neutral-800 transition py-1`
            ,
            active && "text-white dark:text-white scale-[1.15] -translate-y-4 duration-300")
        }>      
            <div className={twMerge(active && "text-white bg-rose-500 flex justify-center items-center w-8 h-8 rounded-full")}>
                <Icon size={20}/>
            </div>
        </Link>
    );
}

export default BottomBarItems;