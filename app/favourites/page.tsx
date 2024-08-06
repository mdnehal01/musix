import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/header";
import Image from "next/image";

import LikedContent from "./components/LikedContent";
import Footer from "@/components/footer/Footer";

export const revalidate = 0;

const Liked = async () => {
    const songs = await getLikedSongs();
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
                            md:flex-row
                            gap-x-5
                        "
                    >
                        <div className="
                            relative
                            h-32
                            w-32
                            lg:w-44
                            lg:h-44
                        ">
                            {/* That big image on liked page */}
                            <Image
                                fill
                                src="/images/liked.png"
                                className="object-cover"
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
                            <p className="hidden md:block fonst-semibold text-sm">
                                Playlist
                            </p>
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
                                Favourites
                            </h1>
                        </div>

                    </div>
                </div>
            </Header>
            <LikedContent songs={songs}/>
            <Footer/>
        </div>
    )
}

export default Liked;