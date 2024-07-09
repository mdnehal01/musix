import { create } from  "zustand";

interface PlaylistModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const usePlaylistModel = create<PlaylistModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen:true }),
    onClose: () => set({ isOpen: false }),
}));

export default usePlaylistModel;