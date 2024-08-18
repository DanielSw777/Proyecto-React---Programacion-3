import "./ToolBar.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";

const ToolBar = () => {

    return (
        <>
            <div className="topbar">
                <div className="search">
                    <label>
                        <input type="text" placeholder="Search here" />
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>
                <Link to="/login" className="user">
                    <img src={logo} alt={logo} />
                </Link>
            </div>
        </>
    );
};

export default ToolBar;
