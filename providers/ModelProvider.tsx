"use client"

import { useEffect, useState } from "react";

import AuthModel from "@/components/authModel";
import UploadModel from "@/components/uploadModel";

const ModelProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModel/>
            <UploadModel/>
        </>
    );
}

export default ModelProvider;