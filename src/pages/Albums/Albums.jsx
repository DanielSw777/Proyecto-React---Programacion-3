import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Albums.css';
import logo from "../../assets/logo.jpg"
import Pagination from '../../components/Pagination/Pagination';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [nextAlbums, setNextAlbums] = useState(null);
    const [previusAlbums, setPreviusAlbums] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAlbums = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setAlbums(data.results);
            setNextAlbums(data.next);
            setPreviusAlbums(data.previous);
            console.log(data);
            setLoading(false);

            sessionStorage.setItem('currentAlbumsPage', url);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedPage = sessionStorage.getItem('currentAlbumsPage');
        const initialUrl = savedPage ?? `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/`;
        fetchAlbums(initialUrl);
    }, []);

    const handlePageChange = (url) => {
        fetchAlbums(url);
        window.scrollTo({ "behavior": "smooth", "top": 0 });
    };

    return (
        <>
            <div className="albums">
                <div className="albums__container-title">
                    <h1 className="albums__title">Albums</h1>
                </div>
                <div className="albums-container">
                    {
                        loading ? (
                            <l-reuleaux
                                size="45"
                                stroke="8"
                                stroke-length="0.15"
                                bg-opacity="0.1"
                                speed="1.2"
                                color="#2a2185"
                            ></l-reuleaux>
                        ) : (
                            albums.length ? (
                                albums.map(album => (
                                    <Link key={album.id} to={`/albums/${album.id}`} className="album-card">
                                        {album.cover ? (
                                            <img src={album.cover} alt={album.title} className="album-cover" />
                                        ) : (
                                            <img src={logo} alt="no_cover" className="album-cover" />
                                        )}
                                        <div className="album-title">{album.title}</div>
                                    </Link>
                                ))
                            ) : (<h2>No hay albums Disponibles</h2>)
                        )
                    }
                </div>
                {
                    albums.length && !loading ? (
                        <Pagination next={nextAlbums} prev={previusAlbums} onPageChange={handlePageChange} />
                    ) : (
                        null
                    )
                }
            </div>
        </>
    );
};

export default Albums;
