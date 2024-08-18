// src/app.js

const apiUrl = 'https://sandbox.academiadevelopers.com/api/artists'; // Ajusta según el endpoint de la API
const token = 'b5e27b8c1f5e7017c794f6e0beeb7390368d8cdf'; // Tu token de autenticación

async function fetchArtists() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos: ' + response.statusText);
        }

        const data = await response.json();
        displayArtists(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayArtists(artists) {
    const artistsList = document.getElementById('artists-list');
    artistsList.innerHTML = ''; // Limpiar contenido previo

    artists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.className = 'artist';
        artistElement.textContent = artist.name; // Ajusta según la estructura de los datos
        artistsList.appendChild(artistElement);
    });
}

// Llamar a la función para cargar los artistas
fetchArtists();
