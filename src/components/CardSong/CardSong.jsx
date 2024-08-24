import { useContext } from "react";
import { MusicContext } from "../../context/MusicProvider";
import "./CardSong.css";

const CardSong = ({ song }) => {
    const { playTrack } = useContext(MusicContext);
    return (
        <>
            <div className="song-card">
                <img src={song.cover} alt={song.title} />
                <div className="song-info">
                    <h3 className="song-title">{song.title}</h3>
                    <button type='button' className="song-play" onClick={() => playTrack(song)}>
                        Play
                    </button>
                </div>
            </div>
        </>
    )
}

export default CardSong;
