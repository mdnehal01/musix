import getSongsByTitle from "@/actions/getSongsByTitle";
import getSongsByAuthor from "@/actions/getSongsByAuthor";
import Header from "@/components/header";
import SearchInput from "@/components/searchInput";
import { FaSearch } from "react-icons/fa";
import SearchContent from "./components/searchContent";
import getSongsByAlbum from "@/actions/getSongsByAlbum";

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

    return (
        <div
            className="
                bg-[#1f1e1e8c]
                h-full 
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header>
                <div className="mb-2 flex flex-col gap-y-6">
                    <div className="flex flex-row items-baseline">
                        <h1 className="text-white text-2xl font-semibold">
                            Search &nbsp; &nbsp;
                        </h1>
                        <FaSearch />
                    </div>
                </div>
            </Header>
            <div className="p-6">
                <SearchInput />
            </div>
            <SearchContent songs={songs} />
        </div>
    );
}

export default Search;
