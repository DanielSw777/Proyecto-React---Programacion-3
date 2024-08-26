import { useContext, useEffect, useState } from 'react';
import CardSong from '../../components/CardSong/CardSong';
import { MusicContext } from '../../context/MusicProvider';
import Pagination from '../../components/Pagination/Pagination';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom'; // Para la redirección del botón
import "./Songs.css";

const Songs = () => {
    const { isAuthenticated } = useAuth("state"); // Obtener el estado de autenticación
    const [isLoading, setIsLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [nextSongs, setNextSongs] = useState(null);
    const [previusSongs, setPreviusSongs] = useState(null);
    const { currentTrack, setCurrentTrack } = useContext(MusicContext);

    const fetchSongs = async (url) => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al cargar canciones");
                }
                const responseData = await response.json();
                setSongs(responseData.results);
                setNextSongs(responseData.next);
                setPreviusSongs(responseData.previous);
                if (responseData.results.length > 0) {
                    setCurrentTrack(responseData.results[0]);
                }
                sessionStorage.setItem('currentSongsPage', url);
            } catch (error) {
                console.error("Error", error);
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

    const handlePageChange = (url) => {
        fetchSongs(url);
        window.scrollTo({ "behavior": "smooth", "top": 0 })
    };

    return (
        <>
            <section className="songs">
                <div className="songs__container-title">
                    <h1 className="songs__title">Songs</h1>
                    {isAuthenticated && (
                        <Link to="/add-song" className="song-play">
                            Agregar Canción
                        </Link>
                    )}
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
                                songs.map(song => (<CardSong key={song.id} song={song} isPlay={currentTrack?.id === song.id} />))
                            ) : (<h2>No hay canciones Disponibles</h2>)
                        )
                    }
                </div>
                {
                    songs.length && !isLoading ? (
                        <Pagination next={nextSongs} prev={previusSongs} onPageChange={handlePageChange} />
                    ) : (
                        null
                    )
                }
            </section>
        </>
    );
};

export default Songs;
