import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./CardArtist.css";

const CardArtist = ({ artist }) => {
    return (
        <>
            <article className="artist-card">
                {artist.image ?
                    <img src={artist.image} alt={artist.title} /> :
                    <img src={logo} alt="no_cover" />
                }

                <h3 className="artist-title">{artist.name}</h3>
                <div className="artist-container-links">
                    <Link to={`/artists/${artist.id}`} className="artist-disc">Discography</Link>
                    <Link type='button' className="artist-web" to={artist.website} target="_blank">
                        Web Site
                    </Link>
                </div>
            </article>
        </>
    )
}

export default CardArtist;
