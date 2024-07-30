import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {

    }

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input type={type}
            className={twMerge(`
                    flex
                    w-full
                    rounded-md
                    dark:bg-neutral-700/50
                    bg-white
                    border-2
                    border-white
                    focus:border-rose-500
                    px-3
                    py-3
                    text-sm
                    font-medium
                    file:border-0
                    file:bg-transparent
                    placeholder:text-neutral-400
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    focus:outline-none
                `, className)}
                disabled={disabled}
                ref={ref}
                {...props}
        />
    )
})

Input.displayName="Input";

export default Input;