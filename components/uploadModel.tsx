"use client";

import useUploadModel from "@/hooks/useUploadModel";
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
import { parseBlob } from 'music-metadata-browser';

const UploadModel = () => {
    const uploadModel = useUploadModel();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
            genre:'',
            release_date:'',
            album:'', 
            lyrics: ''
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            // Reset the form
            reset();
            uploadModel.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // upload to supabase
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile) {
                toast.error('Missing Fields');
                setIsLoading(false);
                return;
            }

            const uniqueID = uniqid();

            // Extract song duration
            const metadata = await parseBlob(songFile);
            const duration = metadata.format.duration; // duration in seconds

            // Upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (songError) {
                console.error('Song upload error:', songError.message); // Log the error message
                setIsLoading(false);
                return toast.error(`Failed song upload: ${songError.message}`);
            }

            // Upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (imageError) {
                console.error('Image upload error:', imageError.message); // Log the error message
                setIsLoading(false);
                return toast.error(`Failed image upload: ${imageError.message}`);
            }

            const {
                error: supabaseError
            } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user?.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                    genre: values.genre,
                    release_date: values.release_date,
                    album: values.album,
                    duration: duration, // include duration in the data
                    lyrics: values.lyrics
                });

            if (supabaseError) {
                console.error('Supabase insert error:', supabaseError.message); // Log the error message
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created');
            reset();
            uploadModel.onClose();

        } catch (error) {
            console.error('Unexpected error:', error); // Log any unexpected errors
            toast.error("Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <Model 
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModel.isOpen}
            onChange={onChange}
        >
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                />

                <Input
                    id="genre"
                    disabled={isLoading}
                    {...register('genre', { required: true })}
                    placeholder="Genre"
                />

                <Input
                    id="release_date"
                    disabled={isLoading}
                    {...register('release_date', { required: true })}
                    placeholder="Release Date"
                />
                <Input
                    id="album"
                    disabled={isLoading}
                    {...register('album', { required: true })}
                    placeholder="Album Name"
                />

                <textarea 
                    id="lyrics" 
                    disabled={isLoading}
                    {...register('album', { required: true })}   
                    placeholder="Lyrics"
                    className="py-2 px-3 bg-transparent border-2 border-white rounded-md" 
                ></textarea>        

                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        {...register('song', { required: true })}
                        accept=".mp3,.aac"
                    />
                </div>

                <div>
                    <div className="pb-1">
                        Select cover image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        {...register('image', { required: true })}
                        accept="image/*"
                    />
                </div>
                <Button className="text-white rounded-none h-12" disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Model>
    );
}

export default UploadModel;
