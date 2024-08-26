import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import avatar from "../../assets/logo.jpg";
import OwnerSongs from "../../components/OwnerSongs/OwnerSongs";
import "./Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token, isAuthenticated } = useAuth("state");

    const fetchProfile = async (url) => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Error al cargar perfil");
                }
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchProfile(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`);
    }, []);

    return (
        <>
            <div className="profile">
                {
                    profile ? (
                        <>
                            <div className="profile-content">
                                <div className="profile-media">
                                    <div className="profile_content-img">
                                        <img src={profile.image ?? avatar} alt="Profile image" />
                                    </div>
                                    <div className="profile_content-name">
                                        <p className="profile-name-last"><span>Nombre: {profile.first_name}</span><span>Apellido: {profile.last_name}</span></p>
                                        <div className="subtitle is-6">
                                            {
                                                profile.state ? (
                                                    <>
                                                        <img src={`${import.meta.env.VITE_API_BASE_URL}${profile.state}`} alt="State icon" />
                                                        <span>{profile.state}</span>
                                                    </>
                                                ) : (null)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-content-data">
                                    <p>Email: <span>{profile.email || "No disponible"}</span></p>
                                    <p>Fecha de Nacimiento: <span>{profile.dob || "No disponible"}</span></p>
                                    <p>Biografía: <span>{profile.bio || "No disponible"}</span></p>
                                </div>
                                <div>
                                    <Link to="/profile-edit" className="profile-editar">Editar</Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h3 className="subtitle">No se encontraron datos del usuario.</h3>
                    )
                }
                <OwnerSongs />
            </div>
        </>
    );
};

export default Profile;
