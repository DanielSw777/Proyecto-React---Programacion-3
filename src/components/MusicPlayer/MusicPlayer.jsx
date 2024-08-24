import { useContext, useRef, useState, useEffect } from 'react';
import { MusicContext } from "../../context/MusicProvider";
import "./MusicPlayer.css";

const MusicPlayer = () => {
    const { currentTrack, isPlaying, togglePlayPause, setIsPlaying } = useContext(MusicContext);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const handleLoadedMetadata = (event) => {
        setDuration(event.target.duration);
    };

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const updateProgress = (event) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = event.target.value;
            setCurrentTime(event.target.value);
        }
    };

    const formatTime = (seconds) => {
        const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
        return `${minutes}:${secs}`;
    };

    useEffect(() => {
        const audio = audioRef.current;

        if (audio && currentTrack) {
            if (audio.src !== currentTrack.song_file) {
                audio.src = currentTrack.song_file;
                setCurrentTime(0);
            }
            isPlaying ? audio.play() : audio.pause();
        }
    }, [currentTrack, isPlaying]);

    return (
        <section className="reproductor-musica">
            {currentTrack ? (
                <>
                    <div className="reproductor-img">
                        <img src={currentTrack ? currentTrack.cover : null} alt={currentTrack ? currentTrack.title : "No cover"} />
                    </div>
                    <div className="reproductor-text">
                        <h2>{currentTrack ? currentTrack.title : "Sin título"}</h2>
                    </div>
                </>
            ) : (null)}
            <div className="reproductor-container">
                <div className="controles">
                    <button className="atras control">
                        <i className="bi bi-rewind-fill"></i>
                    </button>
                    <button className="boton-reproducir-pausar iconoControl" onClick={togglePlayPause}>
                        <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`} id="iconoControl"></i>
                    </button>
                    <button className="adelante control">
                        <i className="bi bi-fast-forward-fill"></i>
                    </button>
                </div>
                <div className="reproductor-audio">
                    <span>{formatTime(currentTime)}</span>
                    <audio
                        ref={audioRef}
                        src={currentTrack?.song_file}
                        onLoadedMetadata={handleLoadedMetadata}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleEnded}
                    />
                    <input
                        type="range"
                        value={currentTime}
                        max={duration}
                        onChange={updateProgress}
                        id="progreso"
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </section>
    );
};

export default MusicPlayer;
