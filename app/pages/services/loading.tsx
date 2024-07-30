"use client";

import Box from "@/components/box";
import { Bars } from "react-loader-spinner";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center dark:bg-[#0f0f0f]/40 bg-[#F5F5F9]">
            <Bars
                height="50"
                width="80"
                color="#F24171"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </Box>
    )
};

export default Loading;