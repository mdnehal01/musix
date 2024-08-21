"use client"

import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiAtom, BiHeart, BiLogIn, BiPlayCircle, BiSearch } from "react-icons/bi";
import Box from "./box";
import Sidebaritem from "./sidebaritems";
import Library from "./library";
import { Playlist, Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import Player from "./player";
import { MdCreate, MdOutlineExplore } from "react-icons/md";
import { IoAlbumsOutline, IoCreate } from "react-icons/io5";
import { CgPlayList, CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Button from "./button";
import { FaUserAlt } from "react-icons/fa";
import useAuthModel from "@/hooks/useAuthModel";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { LuLogIn, LuLogOut } from "react-icons/lu";

interface SidebarProps {
    children: React.ReactNode;
    playlist: Playlist[];
    songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs, playlist }) => {
    const pathName = usePathname();
    const player = usePlayer();
    const router = useRouter();
    const authModel = useAuthModel(); // Auth model hook
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();

        // Function to handle logout
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
            router.refresh(); // Refresh router after logout
    
            if (error) {
                toast.error(error.message); // Show error message if logout fails
            } else {
                toast.success('Logged out!'); // Show success message on logout
            }
    };

    const routes = useMemo(
        () => [
            {
                icon: HiHome,
                label: "Home",
                active: pathName === "/",
                href: "/",
            },
            {
                icon: BiSearch,
                label: "Search",
                active: pathName === "/search",
                href: "/search",
            },
            {
                icon: BiHeart,
                label: "Favourites",
                active: pathName === "/favourites",
                href: "/favourites",
            },
            {
                icon: CgPlayList,
                label: "Playlist",
                active: pathName === "/playlist",
                href: "/playlist",
            },
            {
                icon: MdOutlineExplore,
                label: "Explore",
                active: pathName === "/explore",
                href: "/explore",
            },
            {
                icon: IoAlbumsOutline,
                label: "Albums",
                active: pathName === "/albums",
                href: "albums",
            },
            {
                icon: BiAtom,
                label: "Genres",
                active: pathName === "/genres",
                href: "/genres",
            },
            {
                icon: CgProfile,
                label: "Artist",
                active: pathName === "/active",
                href: "/active",
            },
        ],
        [pathName]
    );

    return (
        <div
            className={twMerge(`
            flex
            h-full
            overflow-hidden
        `)}
        >
            {/* LEFT BAR */}
            <div className="hidden lg:flex flex-col justify-between flex-shrink-0 dark:bg-[#0f0f0f9f] bg-[#F9F8F8] h-full w-[230px] p-2">
                {/* LOGO */}
                <Box className="bg-transparent mt-8 ml-3">
                    <div className="cursor-pointer absolute top-5 left-5"  onClick={()=>{router.push("/")}}>
                        <img className="dark:flex hidden" src="./images/LOGO.png" alt="logo" width={100} />
                        <img className="flex dark:hidden -mt-[15px] -ml-[12px]" src="./images/logoLight.png" alt="logo" width={140} />
                    </div>
                </Box>

                <Box className="bg-gradient-to-r dark:from-[#0F0D0C]/15 from-white dark:to-[#5F5D5D]/15 to-white rounded-none h-[80%] mt-20 relative">
                    <p className="dark:text-[#999999] text-black ml-6 absolute -top-5">Menu</p>
                    <div className="flex flex-col pl-12 py-3 gap-y-3">
                        {routes.map((item) => (
                            <Sidebaritem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="w-full rounded-none relative">
                    {/* Buttons for login and Signup */}
                    <div className="flex justify-between items-center gap-x-4">
                    {/* Logout and user profile buttons */}
                        {user ? (
                            <div className="flex w-full flex-col p-5 gap-y-3">
                                <div onClick={() => router.push('/account')} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 dark:text-neutral-400 text-neutral-800 transition py-1">
                                    <FaUserAlt size={13}/> 
                                    <p>Account</p>
                                </div>
                                <div onClick={handleLogout} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 dark:text-neutral-400 text-neutral-800 transition py-1">
                                    <LuLogOut/> Logout
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full flex-col p-5 gap-y-3">
                                <div onClick={authModel.onOpen} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 dark:text-neutral-400 text-neutral-800 transition py-1">
                                    <MdCreate/> Sign up
                                </div>
                                <div onClick={authModel.onOpen} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 dark:text-neutral-400 text-neutral-800 transition py-1">
                                    <LuLogIn/>Log in
                                </div>
                            </div>
                        )}
                </div>
                </Box>
            </div> 
            {/* LEFT BAR END */}



            {/* MAIN CONTENT */}
            <div className="flex flex-col w-full h-full flex-shrink">
                <main
                    className={twMerge(
                        `h-full flex-1 overflow-y-auto`,
                        // When Playing music the Main body decreases
                        player.activeId && "h-[calc(100%-80px)]"
                    )}
                >
                    {children}
                </main>
                <Player playlist={playlist} />
            </div>

            {/* Right Bar (Fixed) */}
            <div className="hidden md:flex flex-col flex-shrink-0 dark:bg-[#0f0f0f9f] bg-rose-100/50 h-full w-[270px]">
                <Box className="overflow-y-auto h-full bg-transparent">
                    <Library songs={songs}>{children}</Library>
                </Box>
            </div>

                    
            
            {/* <div className="absolute shadow-md right-0 hover:top-0 top-20 hover:relative hidden -mr-[180px] hover:-mr-0 h-12 transition-all duration-300 md:flex flex-col flex-shrink-0 dark:bg-[#0f0f0f9f] bg-rose-100/50 hover:h-full w-[270px]">
                <Box className="overflow-y-auto h-full bg-transparent">
                    <Library songs={songs}>{children}</Library>
                </Box>
            </div> */}
        </div>
    );
};

export default Sidebar;
