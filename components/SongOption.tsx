const SongOption = () => {
    return (
      <div className="absolute bottom-0 right-4 w-48 bg-gray-800 rounded-lg shadow-lg p-2">
        <ul className="text-white">
          <li className="hover:bg-gray-700 p-2 cursor-pointer">Add to Playlist</li>
          <li className="hover:bg-gray-700 p-2 cursor-pointer">Share</li>
          <li className="hover:bg-gray-700 p-2 cursor-pointer">Download</li>
          <li className="hover:bg-gray-700 p-2 cursor-pointer">View Details</li>
        </ul>
      </div>
    );
};

export default SongOption;