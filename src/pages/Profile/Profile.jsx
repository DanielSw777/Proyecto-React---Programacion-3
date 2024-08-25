import { useEffect, useState } from 'react';
import "./Profile.css";

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Profile, setProfile] = useState([]);

    const fetchProfile = async (url) => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al cargar canciones");
                }
                const data = await response.json();
                console.log(data);
                setProfile(data.results);
                setNextProfile(data.next);
                setPreviusProfile(data.previous);
                console.log(data);
                sessionStorage.setItem('currentProfilePage', url);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setIsLoading(false);
            }
        }
    };


    useEffect(() => {
        const savedPage = sessionStorage.getItem('currentProfilePage');
        const initialUrl = savedPage ?? `${import.meta.env.VITE_API_BASE_URL}harmonyhub/Profiles/`;
        fetchProfile(initialUrl);
    }, []);

    return (
        <>
            <div className="profile">

            </div>
        </>
    );
};

export default Profile;
