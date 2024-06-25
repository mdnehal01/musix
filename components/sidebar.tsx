"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi";
import Box from "./box";
import Sidebaritem from "./sidebaritems";
import Library from "./library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import Player from "./player";

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
            <div className="hidden md:flex flex-col bg-[#0f0f0f9f] h-full w-[350px]">

                {/* LOGO */}
                <Box className="bg-transparent mt-8 ml-6">
                    <div>
                        <img src="./images/LOGO.png" alt="logo" width={100} />
                    </div>
                </Box>

                
                <Box className="bg-transparent">
                    <div className="flex flex-col gap-y-4 py-4 px-5">
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
            <div className="flex flex-col w-full h-full">
                <main className={twMerge(`h-full flex-1 overflow-y-auto`,
                    // When Playing music the Main body decreases
                    player.activeId && "h-[calc(100%-80px)]"
                )}>
                    {children}
                </main>
                <Player/>
            </div>


            {/* Right Bar */}
            <div className="hidden md:flex flex-col bg-[#0f0f0f9f] h-full w-[300px] ">

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