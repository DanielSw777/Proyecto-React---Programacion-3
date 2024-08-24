import { useNavigate } from 'react-router-dom'

const CardAlbum = ({ album }) => {

    const navigate = useNavigate();

    return (
        <div className="card">
            {album.cover ? // Si el album tiene imagen, mostrarla, sino mostrar una imagen por defecto
                <img src={album.cover} className="card-img-top" alt="image album" /> :
                <img src="/assets/logoAlbum.jpg" className="card-img-top" alt="image album" />
            }
            <div className="card-body ms-2">
                <h5 className="card-title" onClick={() => navigate(`/albums/${album.id}`)}> {album.title} </h5>
                <p className="card-text"> {album.year} ● Album </p>
            </div>
        </div>
    )
}

export default CardAlbum;
