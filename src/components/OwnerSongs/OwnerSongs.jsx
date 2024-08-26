import { useContext, useEffect, useState } from 'react';
import CardSong from '../../components/CardSong/CardSong';
import { useAuth } from '../../context/AuthProvider';
import "./OwnerSongs.css";
import { MusicContext } from '../../context/MusicProvider';

const Songs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const { userId } = useAuth("state");
    const { currentTrack} = useContext(MusicContext);

    const fetchOwerSongs = async () => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs?owner=${userId}`);
                if (!response.ok) {
                    throw new Error("Error al cargar canciones");
                }
                const responseData = await response.json();
                setSongs(responseData.results);
                console.log(responseData);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchOwerSongs();
    }, []);

    return (
        <>
            <section className="owner__songs">
                <div className="owner__songs__container-title">
                    <h1 className="owner__songs__title">Songs</h1>
                </div>
                <div className="owner__songs__container">
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
            </section>
        </>
    );
};

export default Songs;
