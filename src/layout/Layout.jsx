import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import ToolBar from "../components/ToolBar/ToolBar";
import { AuthProvider } from "../context/AuthProvider";

const Layout = () => {
    return (
        <>
            <AuthProvider>
                <SideBar />
                <div className="main">
                    <ToolBar />
                    <Outlet />
                </div>
            </AuthProvider>
        </>
    );
};

export default Layout;
