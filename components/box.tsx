import { twMerge } from "tailwind-merge";
interface BoxProps{
    children:React.ReactNode;
    className?:string;
}

const Box:React.FC<BoxProps> = ({children, className}) => {

    return(
        <div className={twMerge(`
            rounded-lg
            h-fit
            w-full
            scrollbar-thin
            dark:scrollbar-thumb-gray-800
            scrollbar-thumb-gray-300
            scrollbar-track-transparent
        `, className
        )}>
            {children}
        </div>
    );
}

export default Box;


