import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./ArtistDetails.css";
import CardSong from "../../components/CardSong/CardSong";
import { MusicContext } from "../../context/MusicProvider";

function ArtistDetails() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSongs, setIsLoadingSongs] = useState(false);
    const [songsArt, setSongsArt] = useState([]);
    const { currentTrack } = useContext(MusicContext);


    const fetchArtistId = async (url) => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    throw new Error("Error al cargar canciones");
                }
                setArtist(data);
                if (data.songs.length > 0) {
                    fetchSongs(data.songs);
                }
            } catch (error) {
                console.error("Error", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchSongs = async (songIds) => {
        if (!isLoadingSongs) {
            setIsLoadingSongs(true)
            try {
                const songPromises = songIds.map(id =>
                    fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${id}`).then(response => response.json())
                );
                const songsData = await Promise.all(songPromises);
                setSongsArt(songsData);
            } catch (error) {
                console.error("Error al cargar canciones", error);
            } finally {
                setIsLoadingSongs(false);
            }
        }
    };

    useEffect(() => {
        fetchArtistId(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${id}`);
    }, [id]);

    return (
        <>
            <div className="artist">
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
                        <>
                            <section className="artist-container">
                                {
                                    artist ? (
                                        <>
                                            <div className="artist_cover">
                                                <img
                                                    src={artist.image ?? logo}
                                                    alt={artist.name}
                                                    className="cover-img"
                                                />
                                            </div>
                                            <div className="artist-details">
                                                <h2 className="artist-name">{artist.name}</h2>
                                                <h3 className="artist-number">{artist.songs?.length ? `${artist.songs.length} Canciones` : "Sin Canciones"}</h3>
                                                <p className="artist-subtitle">{artist.bio ?? `${artist.bio}`}</p>
                                                <Link to={artist.website} className="artist-link" target="_blank">
                                                    WebSite:{artist.website ? ` ${artist.website}` : " No tiene"}
                                                </Link>
                                            </div>

                                        </>
                                    ) : (<h2 className="artist-noexist">No existe el Artista</h2>)
                                }
                            </section>
                            <div className="artist__container-songs">
                                {
                                    isLoadingSongs ? (
                                        <l-reuleaux
                                            size="45"
                                            stroke="8"
                                            stroke-length="0.15"
                                            bg-opacity="0.1"
                                            speed="1.2"
                                            color="#2a2185"
                                        ></l-reuleaux>
                                    ) : (
                                        artist && artist.songs.length > 0 ? (
                                            songsArt.map(song => <CardSong key={song.id} song={song} isPlay={currentTrack?.id === song.id} />)
                                        ) : (
                                            null
                                        )
                                    )
                                }
                            </div>
                        </>
                    )
                }

            </div >
        </>
    );
}

export default ArtistDetails;
