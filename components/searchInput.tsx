"use client";

import qs from "query-string";
import Input from "@/components/input";
import { FaSearch } from "react-icons/fa";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("title");
    const debouncedValue = useDebounce<string>(value, 100);

    useEffect(() => {
        const query = { [searchType]: debouncedValue };
        const url = qs.stringifyUrl({ url: '/search', query });

        router.push(url);
    }, [debouncedValue, router, searchType]);

    return (
        <div className="mt-2 flex flex-col gap-y-2">
            <div className="flex gap-x-2">
                <button
                    onClick={() => setSearchType("title")}
                    className={`px-4 transition duration-200 py-2 ${searchType === "title" ? "text-rose-500" : "text-[#999999]"}`}
                >
                    Title
                </button>
                <button
                    onClick={() => setSearchType("author")}
                    className={`px-4 transition duration-200 py-2 ${searchType === "author" ? "text-rose-500" : "text-[#999999]"}`}
                >
                    Author
                </button>
                <button
                    onClick={() => setSearchType("album")}
                    className={`px-4 transition duration-200 py-2 ${searchType === "album" ? "text-rose-500" : "text-[#999999]"}`}
                >
                    Album
                </button>
            </div>
            <Input
                className="border-neutral-800/0 focus:border-2 focus:border-white bg-black/20"
                placeholder={`Search by ${searchType}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default SearchInput;
