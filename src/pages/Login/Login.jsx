import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "./Login.css";

const Login = () => {
    const { isAuthenticated } = useAuth("state");
    const { login } = useAuth("actions");
    const navigate = useNavigate();
    const username = useRef("");
    const password = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            try {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username.current.value,
                        password: password.current.value,
                    }),
                }

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, options);
                if (!response.ok) {
                    throw new Error("No se pudo iniciar sesión");
                }
                const responseData = await response.json();
                if (responseData.token) {
                    const res_profile = await fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data`, {
                        headers: {
                            Authorization: `Token ${responseData.token}`,
                        }
                    });
                    const profile_data = await res_profile.json();
                } else {
                    throw new Error("No se obtuvo un token correctamente");
                }
                login(responseData.token, profile_data.user__id);
            } catch (error) {
                console.error("Error al iniciar sesión", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <>
            <div className="main__container-form" onSubmit={handleSubmit}>
                <form className="main__form" id="form" method="POST">
                    <h2 className="main__form-title">LogIn</h2>
                    <input className="main__form-email" ref={username} type="text" name="email" id="email" placeholder="Correo Electronico" required />
                    <input className="main__form-password" ref={password} type="password" name="password" id="password" placeholder="Contraseña" required autoComplete="off" />
                    <button className="main__form-submit" type="submit">
                        {isLoading ? (
                            <l-reuleaux
                                size="30"
                                stroke="5"
                                stroke-length="0.15"
                                bg-opacity="0.1"
                                speed="1.2"
                                color="#2a2185"
                            ></l-reuleaux>
                        ) : (
                            "Acceder"
                        )}
                    </button>
                    {isError && <p className="main__form-text-error">Error al cargar los datos.</p>}
                    <span className="main__form-text">¿No tenes Cuenta?</span>
                    <a className="main__form-link-reg" href="register.html">Registrarse</a>
                </form>
            </div>
        </>
    )
}

export default Login;
