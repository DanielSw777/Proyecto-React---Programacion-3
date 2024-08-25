// src/pages/Albums/UpdateAlbum.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateAlbum = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`, {
                    headers: {
                        'accept': 'application/json'
                    }
                });
                const data = await response.json();
                setTitle(data.title);
                setCover(data.cover);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchAlbumDetails();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({ title, cover })
            });
            const data = await response.json();
            console.log('Album updated:', data);
            // Handle success
        } catch (error) {
            console.error('Error updating album:', error);
            // Handle error
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Cover URL:
                <input type="text" value={cover} onChange={e => setCover(e.target.value)} />
            </label>
            <button type="submit">Update Album</button>
        </form>
    );
};

export default UpdateAlbum;
