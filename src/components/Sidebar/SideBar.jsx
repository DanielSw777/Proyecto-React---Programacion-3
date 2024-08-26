import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import logo from "../../assets/logo.jpg";
import "./SideBar.css";

const SideBar = () => {
    const { logout } = useAuth("actions");
    const { isAuthenticated } = useAuth("state");
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <nav className="navigation">
                <div className="navigation-logo">
                    <img src={logo} alt={logo} />
                    <span className="title">Harmony Hub</span>
                </div>
                <ul>
                    <li>
                        <NavLink to="/">
                            <span className="icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="title">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">
                            <span className="icon">
                                <ion-icon name="person-circle-outline"></ion-icon>
                            </span>
                            <span className="title">Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/albums">
                            <span className="icon">
                                <ion-icon name="albums-outline"></ion-icon>
                            </span>
                            <span className="title">Albums</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/songs">
                            <span className="icon">
                                <ion-icon name="musical-notes-outline"></ion-icon>
                            </span>
                            <span className="title">Songs</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/artists">
                            <span className="icon">
                                <ion-icon name="body-outline"></ion-icon>
                            </span>
                            <span className="title">Artist</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/genres">
                            <span className="icon">
                                <ion-icon name="nuclear-outline"></ion-icon>
                            </span>
                            <span className="title">Genres</span>
                        </NavLink>
                    </li>
                    {
                        isAuthenticated ? (
                            <li>
                                <button type="button" onClick={handleLogout}>
                                    <span className="icon">
                                        <ion-icon name="log-out-outline"></ion-icon>
                                    </span>
                                    <span className="title">Sign Out</span>
                                </button>
                            </li>
                        ) : (
                            null
                        )
                    }
                </ul>
            </nav>
        </>
    );
};

export default SideBar;
