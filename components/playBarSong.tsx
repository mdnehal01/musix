"use client"

import PlaylistDialoguePlayer from "./playlist/PlaylistDialogPlayer";
import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song, Playlist } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgAdd } from "react-icons/cg";
import AddToPlaylistDialogBtn from "./playlist/AddToPlaylistDialogBtn";

interface PlayBarSongProps {
    data: Song;
    playlist: Playlist[];
    onClick?: (id: string) => void;
}

const PlayBarSong: React.FC<PlayBarSongProps> = ({
    data,
    playlist,
    onClick
}) => {
    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    const router = useRouter();

    const [isPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
    const [selectedSongName, setSelectedSongName] = useState<string | null>(null);
    const [selectedSongAuthor, setSelectedSongAuthor] = useState<string | null>(null);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        // Default turn on player
        return player.setId(data.id);
    }

    const handleOpenDialog = (songId: string, songName: string, songAuthor: string) => {
        setSelectedSongId(songId);
        setSelectedSongName(songName)
        setSelectedSongAuthor(songAuthor)
        setIsPlaylistDialogOpen(true);
    };

    

    return (
        <div
            onClick={handleClick}
            className="
                flex
                md:flex-row
                flex-col
                items-center
                w-full
                md:gap-3
                md:text-left
                text-center
                relative
            "
        >
            {/* Image starts here */}
            <div
                className="
                    relative
                    md:h-[65px]
                    md:w-[65px]
                    w-[100px]
                    h-[100px]
                    overflow-hidden
                    flex
                    flex-shrink-0
                "
            >
                <Image
                    className="object-cover"
                    fill
                    alt="Media Item"
                    src={imageUrl || '/images/liked.png'}
                />
                <div
                    className="
                        w-full
                        h-full
                        opacity-0
                        bg-black/50
                        z-20
                        hover:opacity-100
                        flex
                        justify-center
                        items-center
                        absolute
                        top-0
                        left-0
                        cursor-pointer
                    "
                    // TODO: When clicked playlist dialogue opens
                    onClick={(e) => { e.stopPropagation(); handleOpenDialog(data.id, data.title, data.author); }}
                >
                    <AddToPlaylistDialogBtn onClick={()=>{}} className="text-white"/>
                </div>
            </div>

            <div className="
                flex
                flex-col
                overflow-hidden
                justify-end
                mb-[5px]
            ">
                <p className="text-white text-base truncate hover:text-rose-500" onClick={(e) => { e.stopPropagation(); router.push(`/track/${data.id}`); }}>
                    {data.title}
                </p>

                {/* TODO: Clicking on author opens Author's profile */}
                <p className="text-neutral-400 text-xs truncate">
                    {data.author}
                </p>
            </div>

            {isPlaylistDialogOpen && (
                <PlaylistDialoguePlayer
                    className="w-[500px] h-[600px] p-0 bottom-0 right-0 -top-96"
                    songId={selectedSongId}
                    songName={selectedSongName!}
                    songAuthor={selectedSongAuthor!}
                    playlist={playlist}
                    isOpen={isPlaylistDialogOpen}
                    onClose={() => setIsPlaylistDialogOpen(false)}
                />
            )}
        </div>
    );
}

export default PlayBarSong;
