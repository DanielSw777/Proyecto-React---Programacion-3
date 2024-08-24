import { useContext, useEffect, useState } from 'react';
import CardSong from '../../components/CardSong/CardSong';
import { MusicContext } from '../../context/MusicProvider';
import "./Songs.css";

const Songs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [nextSongs, setNextSongs] = useState(null);
    const [previusSongs, setPreviusSongs] = useState(null);
    const { setCurrentTrack } = useContext(MusicContext);

    const fetchSongs = async (url) => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al cargar canciones");
                }
                const responseData = await response.json();
                console.log(responseData);
                setSongs(responseData.results);
                setNextSongs(responseData.next);
                setPreviusSongs(responseData.previous);
                if (responseData.results.length > 0) {
                    setCurrentTrack(responseData.results[0]);
                }
                sessionStorage.setItem('currentSongsPage', url);
            } catch (error) {
                console.error("Error", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const savedPage = sessionStorage.getItem('currentSongsPage');
        const initialUrl = savedPage ?? `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`;
        fetchSongs(initialUrl);
    }, []);

    const handleNextPage = () => {
        fetchSongs(nextSongs);
        window.scrollTo({ "behavior": "smooth", "top": 0 })
    };

    const handlePrevPage = () => {
        fetchSongs(previusSongs);
        window.scrollTo({ "behavior": "smooth", "top": 0 })
    };

    return (
        <>
            <div className="songs">
                <div className="songs__container-title">
                    <h1 className="songs__title">Songs</h1>
                </div>
                <div className="songs__container">
                    {
                        isLoading ? (
                            <l-reuleaux
                                size="45"
                                stroke="8"
                                stroke-length="0.15"
                                bg-opacity="0.1"
                                speed="1.2"
                                color="#2a2185"
                            ></l-reuleaux>
                        ) : (
                            songs.length ? (
                                songs.map(song => (<CardSong key={song.id} song={song} />))
                            ) : (<h2>No hay canciones Disponibles</h2>)
                        )
                    }
                </div>
                {
                    songs.length && !isLoading ? (
                        <section className="pagination-container">
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-btn" onClick={handlePrevPage} disabled={!previusSongs}>
                                        <ion-icon name="arrow-back-outline"></ion-icon>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="page-btn" onClick={handleNextPage} disabled={!nextSongs}>
                                        <ion-icon name="arrow-forward-outline"></ion-icon>
                                    </button>
                                </li>
                            </ul>
                        </section>
                    ) : (
                        null
                    )
                }
            </div>
        </>
    );
};

export default Songs;
