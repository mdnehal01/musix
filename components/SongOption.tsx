"use client";

import { useRouter } from "next/navigation";

interface SongOptionProps {
  songId: string;
}

const SongOption: React.FC<SongOptionProps> = ({ songId }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/track/${songId}`);
  };

  return (
    <div className="absolute bottom-0 right-4 w-48 bg-black/90 shadow-lg p-2">
      <ul className="text-white">
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Add to Playlist</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Share</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer">Download</li>
        <li className="hover:bg-gray-700 p-2 cursor-pointer" onClick={handleViewDetails}>View Details</li>
      </ul>
    </div>
  );
};

export default SongOption;
