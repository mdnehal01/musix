import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModelProps {
    isOpen: boolean; 
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Model: React.FC<ModelProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return(
        <Dialog.Root 
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="
                    dark:bg-neutral-900/90
                    bg-slate-200/80
                    backdrop-blur-sm
                    fixed
                    inset-0
                    z-50
                " 
                />
                <Dialog.Content
                    className="
                        fixed
                        drop-shadow-md
                        border
                        dark:border-neutral-700
                        border-neutral-300
                        top-[50%]
                        left-[50%]
                        h-full
            
                        md:h-auto
                        w-full
                        md:w-[90vw]
                        md:max-w-[450px]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        rounded-md
                        dark:bg-neutral-800
                        bg-slate-100
                        p-[25px]
                        focus:outline-none
                        z-50
                    "
                >
                    {/* the box after blur */}
                    <Dialog.Title className="text-xl text-center font-bold mb-4">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="mb-5 text-sm leading-normal text-center">
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button 
                            className="
                                dark:text-neutral-400
                                text-neutral-700
                                dark:hover:text-white
                                hover:text-neutral-400
                                absolute 
                                top-[10px]
                                right-[10px]
                                inline-flex
                                h-[25px]
                                w-[25px]
                                appearance-none
                                items-center
                                justify-center
                                rounded-full
                                focus:outline-none
                            "
                        >
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Model;
