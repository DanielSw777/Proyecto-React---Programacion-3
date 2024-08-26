import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import './AddSong.css';

const AddSong = () => {
    const { isAuthenticated, token } = useAuth("state");
    const navigate = useNavigate();

    // Estado para manejo de formulario
    const [songName, setSongName] = useState('');
    const [songFile, setSongFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isAuthenticated) {
        navigate('/login');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLoading) {
            setIsLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('title', songName);
            formData.append('song_file', songFile);
            formData.append('cover_image', coverImage);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                // Redirigir al perfil u otra página después de una carga exitosa
                navigate('/songs');
            } catch (error) {
                console.error('Error al agregar la canción:', error);
                setError('No se pudo agregar la canción. Inténtelo de nuevo.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="add-song">
            <h1>Agregar Canción</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="songName">Nombre de la Canción:</label>
                <input
                    type="text"
                    id="songName"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    required
                />

                <label htmlFor="songFile">Archivo de la Canción:</label>
                <input
                    type="file"
                    id="songFile"
                    accept="audio/*"
                    onChange={(e) => setSongFile(e.target.files[0])}
                    required
                />

                <label htmlFor="coverImage">Imagen de Portada:</label>
                <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Agregar Canción'}
                </button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default AddSong;
