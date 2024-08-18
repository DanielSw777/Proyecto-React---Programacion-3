import { NavLink } from 'react-router-dom';
import "./SideBar.css";
import logo from "../../assets/logo.jpg";

const SideBar = () => {
    
    return (
        <>
            <nav className="navigation">
                <ul>
                    <li>
                        <img src={logo} alt={logo} />
                       <span className="title">Harmony Hub</span>
                    </li>
                    <li>
                        <NavLink to="/">
                            <span className="icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="title">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/playlist">
                            <span className="icon">
                                <ion-icon name="list-outline"></ion-icon>
                            </span>
                            <span className="title">PlayLists</span>
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
                    <li>
                        <NavLink to="/settings">
                            <span className="icon">
                                <ion-icon name="settings-outline"></ion-icon>
                            </span>
                            <span className="title">Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sign-out">
                            <span className="icon">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                            <span className="title">Sign Out</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default SideBar;
