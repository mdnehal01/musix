import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebaritemProps{
    icon:IconType;
    label:string;
    active?:boolean;
    href:string;
}

const Sidebaritem:React.FC<SidebaritemProps> = ({icon:Icon, label, active, href}) => {

    return(
        <Link href={href} className={twMerge(
            `flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 text-neutral-400 transition py-1`
        ,
        active && "text-rose-400 border-r-[2px]")
    }>
            <Icon size={20}/>
            <p className="truncate w-full">{label}</p>
        </Link>
    );
}

export default Sidebaritem;