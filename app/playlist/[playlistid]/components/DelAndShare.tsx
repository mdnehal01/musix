"use client"
import delPlaylistById from '@/actions/delPlaylistById';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BiShareAlt } from 'react-icons/bi';
import { FaCopy, FaFacebook, FaTwitter } from 'react-icons/fa';
import { ImWhatsapp } from 'react-icons/im';
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

interface DelandShareProps {
    playlistId: string;
    playlistUserId:string;
}

const DelAndShare:React.FC<DelandShareProps> = ({
    playlistId, 
    playlistUserId
}) => {

    const router = useRouter();
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [isDelDialogOpen, setIsDelDialogOpen] = useState(false);
    const [showDelBtn, setShowDelBtn] = useState(false);

    const playlistUrl = `${window.location.origin}/playlist/${playlistId}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(playlistUrl);
        toast.success("Link copied to clipboard");
    };

    const handleDeleteDialog = () => {
        setIsDelDialogOpen(true);
    }

    const closeShareDialog = () => {
        setIsShareDialogOpen(false);
    };

    const closeDelDialog = () => {
        setIsDelDialogOpen(false);
    }

    const handleShare = () => {
        setIsShareDialogOpen(true);
    }

    const user = useUser();

    useEffect(() => {
        if (user.user?.id === playlistUserId) {
            setShowDelBtn(true);
        } else {
            setShowDelBtn(false);
        }
    }, [user, playlistUserId]);
    return (
        <div className='flex items-center justify-end gap-3'>
            <BiShareAlt size={35} className='cursor-pointer hover:text-rose-500' onClick={handleShare}/>

            {/*TODO: DONE: Show DELETE ICON only to whome whose playlist is that */}
            {showDelBtn ? (
                <MdOutlineDeleteOutline size={35} className='cursor-pointer hover:text-rose-500' onClick={handleDeleteDialog}/>
            ) : (
                <></>
            )}


            {isShareDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="dark:bg-[#0F0F0F]/80 bg-white/80 p-4 rounded shadow-lg w-64">
                        <h3 className="text-lg font-bold mb-4">Share this song</h3>
                        <div className="flex justify-around mb-4">
                            <WhatsappShareButton url={playlistUrl}>
                                <ImWhatsapp size={32} className="text-green-600" />
                            </WhatsappShareButton>
                            <FacebookShareButton url={playlistUrl}>
                                <FaFacebook size={32} className="text-blue-600" />
                            </FacebookShareButton>
                            <TwitterShareButton url={playlistUrl}>
                                <FaTwitter size={32} className="text-blue-400" />
                            </TwitterShareButton>
                            <button onClick={handleCopyLink}>
                                <FaCopy size={32} className="text-gray-600" />
                            </button>
                        </div>
                        <button onClick={closeShareDialog} className="bg-red-500 text-white p-2 rounded w-full">Close</button>
                    </div>
                </div>
            )}

            {isDelDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="dark:bg-[#0F0F0F]/80 bg-white/80 p-4 rounded shadow-lg w-80">

                    <h3 className="text-lg font-bold mb-4 text-center">Are you sure you want to delete <br /> this Playlist?</h3>
                    
                    <div className='flex gap-4'>
                        <button className="border-2 dark:border-white border-neutral-900 dark:text-white text-neutral-900 p-2 rounded w-full" onClick={() => {delPlaylistById(playlistId)}}>Yes</button>
                        <button className="bg-red-500 text-white p-2 rounded w-full" onClick={closeDelDialog}>Cancel</button>
                    </div>
                    
                    </div>
                </div>
            )}
        </div>
    )
}

export default DelAndShare