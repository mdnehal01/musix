"use client"

import { useEffect, useState } from "react";

import AuthModel from "@/components/authModel";
import UploadModel from "@/components/uploadModel";
import SubscribeModel from "@/components/subscribeModal";
import { ProductWithPrice } from "@/types";
import PlaylistModel from "@/components/playlistModel";

interface ModelProviderProps {
    products: ProductWithPrice[];
}

const ModelProvider: React.FC<ModelProviderProps> = ({
    products
}) => {

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
            <PlaylistModel/>
            <SubscribeModel products={products}/>
        </>
    );
}

export default ModelProvider;