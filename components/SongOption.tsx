"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaTwitter, FaCopy } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton } from "react-share";

interface SongOptionProps {
  songId: string;
}

const SongOption: React.FC<SongOptionProps> = ({ songId }) => {
  const router = useRouter();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const songUrl = `${window.location.origin}/track/${songId}`;

  const handleViewDetails = () => {
    router.push(`/track/${songId}`);
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(songUrl);
    toast.success("Link copied to clipboard");
  };

  const closeShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  return (
    <div className="absolute bottom-0 right-4 w-48 bg-black/90 shadow-lg p-2">
      <ul className="text-white">
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Add to Playlist</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer" onClick={handleShare}>Share</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Download</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer" onClick={handleViewDetails}>View Details</li>
      </ul>

      {isShareDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#0F0F0F]/80 p-4 rounded shadow-lg w-64">
            <h3 className="text-lg font-bold mb-4">Share this song</h3>
            <div className="flex justify-around mb-4">
              <WhatsappShareButton url={songUrl}>
                <ImWhatsapp size={32} className="text-green-600" />
              </WhatsappShareButton>
              <FacebookShareButton url={songUrl}>
                <FaFacebook size={32} className="text-blue-600" />
              </FacebookShareButton>
              <TwitterShareButton url={songUrl}>
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
    </div>
  );
};

export default SongOption;
