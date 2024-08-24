import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import ToolBar from "../components/ToolBar/ToolBar";
import MusicProvider from "../context/MusicProvider";
import { AuthProvider } from "../context/AuthProvider";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

const Layout = () => {
    return (
        <>
            <MusicProvider>
                <AuthProvider>
                    <SideBar />
                    <div className="main">
                        <ToolBar />
                        <Outlet />
                        <MusicPlayer />
                    </div>
                </AuthProvider>
            </MusicProvider>
        </>
    );
};

export default Layout;
