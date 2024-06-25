"use client"

import Button from "./button";
import {useRouter} from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { BiSearch } from "react-icons/bi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps{
    children:React.ReactNode;
    className?:string;
}

const Header:React.FC<HeaderProps> = ({children, className}) => {

    const authModel = useAuthModel();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        // TODO: reset any playing songs 
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else{
            toast.success('Logged out!');
        }
    }

    return(
        <div className={twMerge(`
                h-fit bg-transparent p-6
            `, className)}>

                <div className="w-full mb-4 flex items-center justify-between">

                    {/* Button for Forward and back in Desktop mode */}
                    <div className="hidden md:flex gap-x-2 items-center">
                        <button onClick={()=>{router.back()}} className="rounded-full bg-black items-center justify-center hover:opacity-75 transition">
                            <RxCaretLeft size={25}/>
                        </button>
                        <button onClick={()=>{router.forward()}} className="rounded-full bg-black items-center justify-center hover:opacity-75 transition">
                            <RxCaretRight size={25}/>
                        </button>
                    </div>

                    {/* Button for Home and Search in mobile mode */}
                    <div className="flex md:hidden gap-x-2 items-center">
                        <Link href="/">
                            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                                <HiHome className="text-black" size={20}/>
                            </button>
                        </Link>
                        
                        <Link href="/search">
                            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                                <BiSearch className="text-black" size={20}/>
                            </button>
                        </Link>
                        
                    </div>
                    
                    {/*Button for login and Signup */}
                    <div className="flex justify-between items-center gap-x-4 ">

                        {/* logout handling */}

                        {user ? (
                            <div className="flex gap-x-4 items-center">
                                <Button
                                    onClick={handleLogout}
                                    className="bg-white px-6 py-2 rounded-full"
                                >
                                    Logout
                                </Button>

                                <Button 
                                    onClick={() => router.push('/account')}
                                    className="bg-white h-10 w-10 justify-center items-center"
                                >
                                    <FaUserAlt/>
                                </Button>

                            </div>
                        ) : (

                            <>
                                <div>
                                    <Button onClick={authModel.onOpen} className="bg-transparent text-neutral-300 font-medium transition">
                                        Sign up
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={authModel.onOpen} className="bg-white px-6 py-2 hover:scale-105 transition">
                                        Log in
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                </div>

                {children}

        </div>
    );
}

export default Header;
