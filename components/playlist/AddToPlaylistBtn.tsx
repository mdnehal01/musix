import { IoAdd } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface AddToPlaylistBtnProps {
    onClick: () => void;
    className?: string;
}

const AddToPlaylistBtn: React.FC<AddToPlaylistBtnProps> = ({ onClick, className }) => {
  return (
    <div className='h-8 w-8 flex justify-center items-center cursor-pointer' onClick={onClick}>
      <IoAdd className={twMerge(`text-neutral-500 hover:text-white`, className)} size={30} />
    </div>
  );
}

export default AddToPlaylistBtn;
