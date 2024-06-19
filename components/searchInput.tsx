"use client";

import qs from "query-string";
import Input from "./input";
import { FaSearch } from "react-icons/fa";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 100);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });

        router.push(url);
    }, [debouncedValue, router])
    return (
        <div className="mt-2">
        <Input 
            className="rounded-full border-neutral-800 focus:border-2 focus:border-white bg-neutral-800"
            placeholder="What do you want to listen to?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        
        </div>
    )
}

export default SearchInput;