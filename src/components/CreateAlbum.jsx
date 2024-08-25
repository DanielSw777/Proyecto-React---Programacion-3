// src/pages/Albums/CreateAlbum.jsx
import React, { useState } from 'react';

const CreateAlbum = () => {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/albums/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({ title, cover })
            });
            const data = await response.json();
            console.log('Album created:', data);
            // Handle success (e.g., redirect or show a success message)
        } catch (error) {
            console.error('Error creating album:', error);
            // Handle error
        }
    };

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
            <button type="submit">Create Album</button>
        </form>
    );
};

export default CreateAlbum;
