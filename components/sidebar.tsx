"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi"
import { BiAtom, BiPlayCircle, BiSearch } from "react-icons/bi";
import Box from "./box";
import Sidebaritem from "./sidebaritems";
import Library from "./library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import Player from "./player";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { IoAlbumsOutline } from "react-icons/io5";
import { HiBars3, HiBars4 } from "react-icons/hi2";
import { LuAlignVerticalDistributeStart, LuAlignVerticalJustifyStart } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { GiHumanPyramid } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { RiProfileLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

interface SidebarProps{
    children:React.ReactNode;
    songs:Song[];
}

const Sidebar:React.FC<SidebarProps> = ({children, songs}) => {

    const pathName = usePathname();
    const player = usePlayer()

    const routes = useMemo(() => [
        {
            icon:HiHome,
            label:'Home',
            active:pathName !== '/search',
            href:'/'
        },
        {
            icon:BiSearch,
            label:'Search',
            active:pathName === '/search',
            href:'/search'
        },
        {
            icon:MdOutlineExplore,
            label:'Explore',
            active: pathName === '/explore',
            href:'/explore'
        },
        {
            icon:IoAlbumsOutline,
            label:'Albums',
            active:pathName === '/albums',
            href:'albums'
        },
        {
            icon:BiAtom,
            label:'Genres',
            active:pathName === '/genres',
            href:'/genres'
        },
        {
            icon:CgProfile,
            label:'Artist',
            active:pathName === '/active',
            href:'/active'
        }
    ], [pathName]);

    return(
        <div className={twMerge(`
            flex
            h-full
            overflow-hidden
        `
        )}>

            {/* LEFT BAR */}
            <div className="hidden lg:flex flex-col justify-between flex-shrink-0 bg-[#0f0f0f9f] h-full w-[230px] p-2">

                {/* LOGO */}
                <Box className="bg-transparent mt-8 ml-3">
                    <div>
                        <img src="./images/LOGO.png" alt="logo" width={100} />
                    </div>
                </Box>

                <Box className="bg-gradient-to-r from-[#0F0D0C]/15 to-[#5F5D5D]/15 rounded-none h-[80%] relative">
                    <p className="text-[#999999] ml-6 absolute -top-5">Menu</p>
                    <div className="flex flex-col pl-12 py-3 gap-y-3">
                        {routes.map((item) => (
                            <Sidebaritem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
            </div>

            {/*MAIN CONTENT */}
            <div className="flex flex-col w-full h-full flex-shrink">
                <main className={twMerge(`h-full flex-1 overflow-y-auto`,
                    // When Playing music the Main body decreases
                    player.activeId && "h-[calc(100%-80px)]"
                )}>
                    {children}
                </main>
                <Player/>
            </div>


            {/* Right Bar */}
            <div className="hidden md:flex flex-col flex-shrink-0 bg-[#0f0f0f9f] h-full w-[270px] ">

                <Box className="overflow-y-auto h-full bg-transparent">
                    <Library songs={songs}>
                        {children}
                    </Library>
                </Box>
            </div>
        </div>
    );
}

export default Sidebar;