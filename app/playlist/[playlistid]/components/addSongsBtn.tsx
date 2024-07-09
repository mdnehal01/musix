"use client";

import { BsPlus } from "react-icons/bs";
import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import usePlaylistModel from "@/hooks/usePlaylistModel";
import useSubscribeModel from "@/hooks/useSubscribeModel";
import { useRouter } from "next/navigation";

const AddSongsBtn = () => {
  const { user, subscription } = useUser();
  const authModel = useAuthModel();
  const subscribeModel = useSubscribeModel();
  const playlistModel = usePlaylistModel();
  const router = useRouter();

  const onClick = () => {
    console.log("Button clicked");
    if (!user) {
      console.log("No user, opening auth model");
      return authModel.onOpen();
    }

    if (!subscription) {
      console.log("No subscription, opening subscribe model");
      return subscribeModel.onOpen();
    }

    // TODO: All the songs dialog with a search bar and each song with a + icon
    // TEMP: REDIRECTING TO THE PLAYLIST PAGE
    router.push("/search"); 
    // console.log("Opening playlist model");
    // return playlistModel.onOpen();
  };

  return (
    <button
      onClick={onClick}
      className="h-12 w-12 bg-rose-500 flex rounded-full shadow-black/70 hover:shadow-black/30 shadow-lg items-center justify-center"
    >
      <BsPlus size={40} />
    </button>
  );
};

export default AddSongsBtn;
