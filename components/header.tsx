'use client'
// Import necessary modules and components
import { useMemo } from "react";
import { MdCreate, MdOutlineExplore } from "react-icons/md";
import { IoAlbumsOutline } from "react-icons/io5";
import { CgClose, CgPlayList, CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import Button from "./button";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { BiMenu, BiSearch, BiAtom, BiHeart } from "react-icons/bi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import Box from "./box";
import Sidebaritem from "./sidebaritems";
import { LuLogIn, LuLogOut } from "react-icons/lu";


// Define the HeaderProps interface
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}



// Define the Header component
const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle
    const pathName = usePathname();
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

    const authModel = useAuthModel(); // Auth model hook
    const router = useRouter(); // Next.js router hook

    const supabaseClient = useSupabaseClient(); // Supabase client hook
    const { user } = useUser(); // User hook

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

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const MenuIcon = !isSidebarOpen ? MdMenu : CgClose;

    return (
        <div className={twMerge(`
            h-fit
            bg-transparent
            p-6
        `, className)}>
            {/* Header content */}
            <div className="w-full mb-4 flex items-center justify-between">

                {/* LOGO IN MOBILE VIEW */}
                <div className="cursor-pointer" onClick={()=>{router.push("/")}}>
                    <Box className="lg:hidden flex justify-start">
                        <img src="./images/LOGO.png" alt="logo" width={100} className="mt-1"/>
                    </Box>
                </div>
                
                {/* Buttons for login and Signup */}
                <div className="hidden lg:flex justify-between items-center gap-x-4">
                   {user ? (
                    <Button onClick={() => router.push('/account')} className="bg-white h-10 w-10 justify-center items-center">
                        <FaUserAlt />
                    </Button>
                   ) : (
                    <></>
                   ) } 
                    
        
                </div>
                
                {/* Button for Home and Search in mobile mode */}
                <div className="flex lg:hidden gap-x-2 items-center">
                    <MenuIcon size={25} onClick={toggleSidebar} className="cursor-pointer" />
                </div>
            </div>

            {/* Sidebar */}
            <div className={twMerge(`
                lg:hidden
                fixed
                z-20
                left-0
                top-0
                h-full
                bg-[#0f0f0f]
                w-4/5
                md:w-1/2
                p-2
                transform
                transition-transform
                duration-300
                ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `)}>

                {/* Close Btn */}
                {/* <CgClose className="absolute top-5 right-5 cursor-pointer" size={25} onClick={toggleSidebar}/> */}

                {/* Sidebar content */}
                <div className="flex flex-col justify-between h-full">
                    {/* Sidebar items */}
                    {/* LOGO */}
                <Box className="bg-transparent mt-8 ml-3">
                    <div>
                        <img src="./images/LOGO.png" alt="logo" width={100} />
                    </div>
                </Box>

                <Box className="bg-gradient-to-r from-[#0F0D0C]/15 to-[#5F5D5D]/15 rounded-none h-[80%] mt-10 relative">
                    <p className="text-[#999999] ml-6 absolute -top-5">Menu</p>
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
                                <div onClick={() => router.push('/account')} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 text-neutral-400 transition py-1">
                                    <FaUserAlt size={13}/> 
                                    <p>Account</p>
                                </div>
                                <div onClick={handleLogout} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 text-neutral-400 transition py-1">
                                    <LuLogOut/> Logout
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full flex-col p-5 gap-y-3">
                                <div onClick={authModel.onOpen} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 text-neutral-400 transition py-1">
                                    <MdCreate/> Sign up
                                </div>
                                <div onClick={authModel.onOpen} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-light cursor-pointer rounded-[1px] hover:text-rose-400 hover:border-r-[2px] border-rose-400 text-neutral-400 transition py-1">
                                    <LuLogIn/>Log in
                                </div>
                            </div>
                        )}
                </div>
                </Box>
                </div>
            </div>

            {/* Main content */}
            {children}
        </div>
    );
};

export default Header;
