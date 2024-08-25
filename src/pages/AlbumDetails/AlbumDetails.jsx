import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { MusicContext } from '../../context/MusicProvider';
import logo from "../../assets/logo.jpg";
import './AlbumDetails.css'; // Asegúrate de que el archivo CSS está en la ubicación correcta

const AlbumDetails = () => {
    const { id: albumId } = useParams(); // Extrae el id del álbum desde los parámetros de la URL
    const [album, setAlbum] = useState(null);
    const [songsAlbum, setSongsAlbum] = useState([]);
    const { playTrack, isPlaying, currentTrack} = useContext(MusicContext); // Usa el contexto para actualizar la pista actual

    useEffect(() => {
        // Obtener detalles del álbum
        fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${albumId}/`)
            .then(response => response.json())
            .then(data => setAlbum(data))
            .catch(error => console.error('Error fetching album details:', error));

        // Obtener canciones del álbum
        fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${albumId}/songs/`)
            .then(response => response.json())
            .then(data => setSongsAlbum(data.results))
            .catch(error => console.error('Error fetching album songs:', error));
    }, [albumId]);

    if (!album) {
        return <div>Loading...</div>;
    }

    return (
        <div className="album-details-container">
            <div className="album-details-content">
                <div className="album-image">
                    <img src={album.cover ?? logo} alt={album.title} />
                </div>
                <div className="song-list">
                    <h1>{album.title}</h1>
                    <p>Year: {album.year}</p>
                    <h2>Songs</h2>
                    <ul>
                        {songsAlbum.map(song => (
                            <li key={song.id}>
                                <p>{song.title}</p>
                                {
                                    isPlaying && currentTrack?.id === song.id? (
                                        <l-quantum
                                            size="35"
                                            speed="1.75"
                                            color="black"
                                        ></l-quantum>
                                    ) : (null)
                                }
                                <button onClick={() => playTrack(song)}>Play</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AlbumDetails;
