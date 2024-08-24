import React, { createContext, useState } from 'react';

export const MusicContext = createContext();

const MusicProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);


    const playTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    return (
        <MusicContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlayPause, setIsPlaying, setCurrentTrack}}>
            {children}
        </MusicContext.Provider>
    );
};

export default MusicProvider;
