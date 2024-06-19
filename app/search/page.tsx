

import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/header";
import SearchInput from "@/components/searchInput";
import { FaSearch } from "react-icons/fa";
import SearchContent from "./components/searchContent";

interface SearchProps {
    searchParams: {
        title: string;
    }
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div
            className="
                bg-neutral-900
                rounded-lg
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
                        <FaSearch/>
                    </div>
                </div>
            </Header>
            <div className="p-6">
                <SearchInput/>
            </div>
            <SearchContent songs={songs} />
            
        </div>
    );
}

export default Search;