"use client";
import { useState } from "react";
import { Playlist, Song } from "@/types";
import LikeButton from "@/components/likeButton";
import useOnPlay from "@/hooks/useOnPlay";
import MediaItemDetailed from "@/components/mediaItemDetailed";
import AddToPlaylistDialogBtn from "@/components/playlist/AddToPlaylistDialogBtn";
import PlaylistDialogue from "@/app/playlist/components/PlaylistDialogue";
import MediaItem from "@/components/mediaItem";

interface SearchContentProps {
    songs: Song[];
    playlist: Playlist[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs, playlist }) => {
    const onPlay = useOnPlay(songs);

    const [isPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

    const handleOpenDialog = (songId: string) => {
        setSelectedSongId(songId);
        setIsPlaylistDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsPlaylistDialogOpen(false);
        setSelectedSongId(null);
    };

    if (songs.length === 0) {
        return (
            <div
                className="
                    flex 
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
                "
            >
                No songs found.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1 max-md:hidden">
                        <MediaItemDetailed
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    
                    <div className="flex-1 md:hidden">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>

                    <div>
                        <AddToPlaylistDialogBtn onClick={() => handleOpenDialog(song.id)} />
                    </div>

                    <LikeButton songId={song.id} />
                </div>
            ))}
            {isPlaylistDialogOpen && (
                <PlaylistDialogue 
                    songId={selectedSongId} 
                    playlist={playlist}
                    isOpen={isPlaylistDialogOpen} 
                    onClose={handleCloseDialog} 
                />
            )}
        </div>
    );
}

export default SearchContent;
