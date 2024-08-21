import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/header";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import RecentContent from "./components/RecentContent";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useUser } from "@/hooks/useUser";
import getRecentSongs from "@/actions/getRecentSongs";
import getRecentSongArr from "@/actions/getRecentSongArr";
import recent from '@/public/images/recent.png'

export const revalidate = 0;

const Recents = async () => {

    const songIds = await getRecentSongArr();
    const songs = songIds.length ? await getRecentSongs(songIds) : [];

    return (
        <div 
            className="
                dark:bg-[#1f1e1e8c]
                bg-[#F3F5F9]/10
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header>
                <div className="mt-20">
                    <div 
                        className="
                            flex
                            flex-col
                            items-center
                            md:items-start
                            gap-x-5
                        "
                    >
                        <div className="
                            relative
                            h-32
                            w-32
                            lg:w-full
                            lg:h-64
                            rounded-lg
                        ">
                            {/* That big image on Recent page */}
                            <Image
                                fill
                                src={recent}
                                className="object-cover rounded-lg"
                                alt="Playlist"
                            />
                        </div>

                        <div className="
                            flex
                            flex-col
                            gap-y-2
                            mt-4
                            md:mt-0
                        ">
                     
                            <h1
                                className="
                                    dark:text-white
                                    text-rose-500
                                    text-4xl
                                    sm:text-5xl
                                    lg:text-6xl
                                    font-bold
                                "
                            >
                                Recents
                            </h1>
                        </div>

                    </div>
                </div>
            </Header>
                <RecentContent songs={songs}/>
            <Footer/>
        </div>
    )
}

export default Recents;