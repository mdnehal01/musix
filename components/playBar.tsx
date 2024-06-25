"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { FaDotCircle } from "react-icons/fa";

interface PlayBarProps {
    value?: number;
    onChange?: (value: number) => void;
}

const PlayBar: React.FC<PlayBarProps> = ({
    value = 1,
    onChange
}) => {

    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }

    return (
        <RadixSlider.Root
            className="
                flex
                items-center
                select-none
                touch-none
                w-full
                h-3
            "
            defaultValue={[0]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.01} // Adjust step value for better single-click handling
            aria-label="Song Bar"
        >
            <RadixSlider.Track
                className="
                    bg-neutral-600
                    relative
                    grow
                    rounded-full
                    h-[5px]
                    cursor-pointer
                "
            >
                <RadixSlider.Range
                    className="
                        absolute
                        bg-rose-500
                        rounded-full
                        h-full
                        cursor-pointer
                    "  
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    )
}

export default PlayBar;
