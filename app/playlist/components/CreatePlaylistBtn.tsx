"use client";

import { BsPlus } from "react-icons/bs";
import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import usePlaylistModel from "@/hooks/usePlaylistModel";
import useSubscribeModel from "@/hooks/useSubscribeModel";

const CreatePlaylistBtn = () => {
  const { user, subscription } = useUser();
  const authModel = useAuthModel();
  const subscribeModel = useSubscribeModel();
  const playlistModel = usePlaylistModel();

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

    console.log("Opening playlist model");
    return playlistModel.onOpen();
  };

  return (
    <button
      onClick={onClick}
      className="h-12 w-56 bg-rose-500 flex text-lg hover:rounded-lg rounded-none transition duration-200 text-black shadow-black/70 hover:shadow-black/30 shadow-lg items-center justify-center"
    >
      <p>Create Playlist</p>
    </button>
  );
};

export default CreatePlaylistBtn;
