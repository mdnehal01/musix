"use client";

import usePlaylistModel from "@/hooks/usePlaylistModel";
import Model from "./model";
import Input from "./input";
import Button from "./button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { parseBlob } from "music-metadata-browser";
import { BsPlus } from "react-icons/bs";

const PlaylistModel = () => {
  const playlistModel = usePlaylistModel();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      playlist_name: "",
      description: ""
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      // Reset the form
      reset();
      playlistModel.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setIsLoading(true);

      const uniqueID = uniqid();


      const { error: supabaseError } = await supabaseClient.from("playlist")
        .insert({
          user_id: user?.id,
          playlist_name: values.playlist_name,
          description: values.description
      });

      if (supabaseError) {
        console.error("Supabase insert error:", supabaseError.message); // Log the error message
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Playlist Added");
      reset();
      playlistModel.onClose();
    } catch (error) {
      console.error("Unexpected error:", error); // Log any unexpected errors
      toast.error("Something went wrong while creating playlist");
      setIsLoading(false);
    }
  };

  console.log("PlaylistModel isOpen:", playlistModel.isOpen);

  return (
    <Model
      title="Create new playlist"
      description="Listen to songs of your choice."
      isOpen={playlistModel.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="playlist_name"
          disabled={isLoading}
          {...register("playlist_name", { required: true })}
          placeholder="Playlist Name"
        />
        <Input
          id="description"
          disabled={isLoading}
          {...register("description", { required: false })}
          placeholder="Description"
        />
        <center>
          <Button
            className="text-white w-12 rounded-full flex items-center justify-center h-12"
            disabled={isLoading}
            type="submit"
          >
            <BsPlus className="scale-150" size={100}/>
          </Button>
        </center>
      </form>
    </Model>
  );
};

export default PlaylistModel;
