import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthProvider";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token, userId } = useAuth("state");
    const navigate = useNavigate();
    const formRef = useRef(null);

    const fetchProfile = async () => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`, {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formRef.current && !isLoading) {
            setIsLoading(true);
            const formData = new FormData(formRef.current);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/${userId}`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error("Error al actualizar perfil");
                }
                const updatedProfile = await response.json();
                setProfile(updatedProfile);
                navigate("/profile");
            } catch (error) {
                console.error("Error", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <>
            <div className="edit__container-form">
                {
                    profile ? (
                        <form ref={formRef} className="edit__form" id="form" onSubmit={handleSubmit}>
                            <h2 className="edit__form-title">Editar Perfil</h2>
                            <div className="edit__container-name-last">
                                <input className="edit__form-name" type="text" name="first_name" placeholder="Nombre" required defaultValue={profile.first_name} />
                                <input className="edit__form-last-name" type="text" name="last_name" placeholder="Apellido" defaultValue={profile.last_name} />
                            </div>
                            <input className="edit__form-email" type="email" name="email" placeholder="Correo Electronico" defaultValue={profile.email} />
                            <textarea className="edit__form-textarea" name="bio" placeholder="Biografía" defaultValue={profile.bio}></textarea>
                            <input className="edit__form-submit" type="submit" value="Actualizar" disabled={isLoading} />
                        </form>
                    ) : (
                        <h3 className="subtitle">No se encontraron datos del usuario.</h3>
                    )
                }
            </div>
        </>
    );
};

export default EditProfile;
