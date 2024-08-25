import { useContext } from "react";
import { MusicContext } from "../../context/MusicProvider";
import logo from "../../assets/logo.jpg";
import "./CardSong.css";

const CardSong = ({ song, isPlay }) => {
    const { playTrack, isPlaying } = useContext(MusicContext);
    return (
        <>
            <article className="song-card">
                <div className="song-cover-container">
                    {song.cover ?
                        <img src={song.cover} alt={song.title} /> :
                        <img src={logo} alt="no_cover" />
                    }
                    {(isPlaying && isPlay) && (
                        <div className="song-loader">
                            <l-ripples size="85" speed="3" color="var(--gray)"></l-ripples>
                        </div>
                    )}
                </div>
                <div className="song-info">
                    <h3 className="song-title">{song.title}</h3>
                    <button type='button' className="song-play" onClick={() => playTrack(song)}>
                        {'Play'}
                    </button>
                </div>
            </article>
        </>
    )
}

export default CardSong;
