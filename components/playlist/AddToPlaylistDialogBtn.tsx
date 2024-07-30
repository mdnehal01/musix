import { CgAdd } from "react-icons/cg";
import { IoAdd } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface AddToPlaylistDialogBtnProps {
    onClick: () => void;
    className?: string;
}

const AddToPlaylistDialogBtn: React.FC<AddToPlaylistDialogBtnProps> = ({ onClick, className }) => {
  return (
    <div className='h-8 w-8 flex justify-center items-center cursor-pointer' onClick={onClick}>
      <CgAdd className={twMerge(`text-neutral-400 hover:text-white`, className)} size={20} />
    </div>
  );
}

export default AddToPlaylistDialogBtn;
