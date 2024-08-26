import { useEffect, useState } from 'react';
import CardArtist from '../../components/CardArtist/CardArtist';
import Pagination from '../../components/Pagination/Pagination';
import "./Artists.css";

const Artists = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [artists, setArtists] = useState([]);
    const [nextArtists, setNextArtists] = useState(null);
    const [prevArtists, setPrevArtists] = useState(null);

    const fetchArtists = async (url) => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al cargar artistas");
                }
                const data = await response.json();
                setArtists(data.results);
                setNextArtists(data.next);
                setPrevArtists(data.previous);
                sessionStorage.setItem('currentArtistsPage', url);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const savedPage = sessionStorage.getItem('currentArtistsPage');
        const initialUrl = savedPage ?? `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/`;
        fetchArtists(initialUrl);
    }, []);

    const handlePageChange = (url) => {
        fetchArtists(url);
        window.scrollTo({ behavior: "smooth", top: 0 });
    };

    return (
        <>
            <section className="artists">
                <div className="artists__container-title">
                    <h1 className="artists__title">Artists</h1>
                </div>
                <div className="artists__container">
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
                            artists.length ? (
                                artists.map(artist => (<CardArtist key={artist.id} artist={artist} />))
                            ) : (<h2>No hay Informacion de Artistas Disponible</h2>)
                        )
                    }
                </div>
                {
                    artists.length && !isLoading ? (
                        <Pagination
                            next={nextArtists}
                            prev={prevArtists}
                            onPageChange={handlePageChange}
                        />
                    ) : (
                        null
                    )
                }
            </section>
        </>
    );
};

export default Artists;
