// hooks/useAudioPlayer.js

import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from '@/components/playerContent';
import { twMerge } from "tailwind-merge";


const useAudioPlayer = (playlist) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!shaka.Player.isBrowserSupported()) {
      console.error('Shaka Player is not supported on this browser.');
      return;
    }

    const video = videoRef.current;
    const player = new shaka.Player(video);
    playerRef.current = player;

    player.addEventListener('error', onErrorEvent);

    if (playlist.length > 0) {
      playSong(currentSongIndex);
    }

    return () => {
      player.destroy();
    };
  }, [currentSongIndex, playlist]);

  const onErrorEvent = (event) => {
    console.error('Error code', event.detail.code, 'object', event.detail);
  };

  const playSong = (index) => {
    const player = playerRef.current;
    if (player) {
      player.load(playlist[index]).then(() => {
        console.log('The song has now been loaded!');
      }).catch(onErrorEvent);
    }

    preloadSongs(index);
  };

  const preloadSongs = (index) => {
    const player = playerRef.current;
    for (let i = index + 1; i <= index + 5 && i < playlist.length; i++) {
      if (player) {
        player.load(playlist[i], 0, false); // Load without auto-play
      }
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return { currentSongIndex, playSong, nextSong, videoRef };
};

export default useAudioPlayer;
