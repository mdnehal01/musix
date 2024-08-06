import getSongsByTitle from "@/actions/getSongsByTitle";
import getSongsByAuthor from "@/actions/getSongsByAuthor";
import Header from "@/components/header";
import SearchInput from "@/components/searchInput";
import { FaSearch } from "react-icons/fa";
import SearchContent from "./components/searchContent";
import getSongsByAlbum from "@/actions/getSongsByAlbum";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";
import Footer from "@/components/footer/Footer";

interface SearchProps {
    searchParams: {
        title?: string;
        author?: string;
        album?: string;
    }
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {

    // @ts-ignore
    let songs = await getSongsByTitle(searchParams.title);
    if (searchParams.title) {
        songs = await getSongsByTitle(searchParams.title);
    } else if (searchParams.author) {
        songs = await getSongsByAuthor(searchParams.author);
    } else if (searchParams.album) {
        songs = await getSongsByAlbum(searchParams.album)
    }

    const fetchPlaylistByUserId = await getPlaylistByUserId();

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
                <div className="mb-2 flex flex-col gap-y-6">
                    <div className="flex flex-row items-baseline">
                        <h1 className="dark:text-white text-rose-500 text-2xl font-semibold">
                            Search &nbsp; &nbsp;
                        </h1>
                        <FaSearch className="dark:text-white text-rose-500"/>
                    </div>
                </div>
            </Header>
            <div className="p-6">
                <SearchInput />
            </div>
            <SearchContent playlist={fetchPlaylistByUserId} songs={songs} />
            <Footer/>
        </div>
    );
}

export default Search;
