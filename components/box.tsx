import { twMerge } from "tailwind-merge";
interface BoxProps{
    children:React.ReactNode;
    className?:string;
}

const Box:React.FC<BoxProps> = ({children, className}) => {

    return(
        <div className={twMerge(`
            bg-neutral-900
            rounded-lg
            h-fit
            w-full
            scrollbar-thin
            scrollbar-thumb-gray-800
            scrollbar-track-transparent
        `, className
        )}>
            {children}
        </div>
    );
}

export default Box;


