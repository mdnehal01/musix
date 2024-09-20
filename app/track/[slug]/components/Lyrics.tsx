"use client"

import React, { useState } from 'react'

interface LyricsProps{
    text?:String
}

const Lyrics:React.FC<LyricsProps> = ({
    text
}) => {

    const [showMore, setShowMore] = useState(false);

    // Handler to toggle "Show more" and "Show less"
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    // Split the lyrics into lines
    const lyricsLines = text?.split('\n');

    return (
//         <pre className="px-6 text-wrap">
// {text}
//         </pre>
<div className="px-6 text-wrap">
{/* Show only the first 10 lines, or the full lyrics based on the state */}
{showMore ? (
  <pre>{text}</pre>
) : (
  <pre>{lyricsLines?.slice(0, 10).join('\n')}</pre>
)}

{/* Show more/less button */}
{/* @ts-ignore */}
{lyricsLines.length > 10 && (
  <button onClick={toggleShowMore} className="bg-rose-500 text-white py-2 px-5 cursor-pointer rounded-md hover:pr-20 transition-all duration-300 mt-2">
    {showMore ? 'Show less' : 'Show more'}
  </button>
)}
</div>
    )
}

export default Lyrics