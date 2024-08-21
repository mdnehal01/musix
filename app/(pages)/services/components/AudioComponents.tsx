"use client";

import React, { useRef, useState } from 'react';

const AudioComponents = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [play, setPlay] = useState(false);

    const handlePlayPause = () => {
        if(!play){
            if (audioRef.current) {
                audioRef.current.play();
            }
            setPlay(true);
        }else if(play) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlay(false);
        }
        
    };

    return (
        <div>
            <audio ref={audioRef} src="https://storage.googleapis.com/onemusixapp/%5BSPOTIFY-DOWNLOADER.COM%5D%20Taylor%20Swift%20(Deluxe%20Edition)/%5BSPOTIFY-DOWNLOADER.COM%5D%20A%20Perfectly%20Good%20Heart.mp3"></audio>
            <img src='https://storage.googleapis.com/onemusixapp/Images/profilePic.png'/>
            <button onClick={handlePlayPause}>Play</button>
        </div>
    );
}

export default AudioComponents;
