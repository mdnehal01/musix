import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModel";
import { useUser } from "./useUser";
import useSubscribeModel from "./useSubscribeModel";

const useOnPlay = (songs:Song[]) => {
    const subscribeModel = useSubscribeModel();  // Apply subscribe model
    const player = usePlayer();
    const authModel = useAuthModel();
    const { user, subscription } = useUser();

    const onPlay = (id:string) => {
        if(!user) {
            return authModel.onOpen();
        }

        // IN FUTURE

        // if(!subscription) {    // Subscription model dialogue open
        //     return subscribeModel.onOpen();
        // }
        
        player.setId(id);

        // WHen clicked it will play the whole playlist
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
}


export default useOnPlay;