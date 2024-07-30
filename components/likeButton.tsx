"use client";

import useAuthModel from "@/hooks/useAuthModel";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

interface LikeButtonProps {
    songId: string;
    classname?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, classname }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModel = useAuthModel();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .maybeSingle();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModel.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
                toast.success('Unliked!');
            }
        } else {
            const { data, error: fetchError } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .maybeSingle();

            if (fetchError) {
                toast.error(fetchError.message);
                return;
            }

            if (!data) {
                const { error } = await supabaseClient
                    .from('liked_songs')
                    .insert({
                        song_id: songId,
                        user_id: user.id
                    });

                if (error) {
                    toast.error(error.message);
                } else {
                    setIsLiked(true);
                    toast.success('Liked!');
                }
            } else {
                setIsLiked(true);
            }
        }
        router.refresh();
    };

    return (
        <button
            onClick={handleLike}
            className={twMerge(`hover:opacity-75
                transition`, classname)}
        >
            <Icon className={isLiked ? 'text-[#F24171]' : 'dark:text-[white] text-neutral-800'} size={25} />
        </button>
    );
};

export default LikeButton;
