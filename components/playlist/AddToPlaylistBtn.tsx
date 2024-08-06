import { IoAdd } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface AddToPlaylistBtnProps {
    onClick: () => void;
    className?: string;
}

const AddToPlaylistBtn: React.FC<AddToPlaylistBtnProps> = ({ onClick, className }) => {
  return (
    <div className='h-8 w-8 flex justify-center items-center cursor-pointer' onClick={onClick}>
      <IoAdd className={twMerge(`dark:text-neutral-500 text-neutral-800 dark:hover:text-white hover:text-neutral-400`, className)} size={30} />
    </div>
  );
}

export default AddToPlaylistBtn;
