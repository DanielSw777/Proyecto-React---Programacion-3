import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import ToolBar from "../components/ToolBar/ToolBar";

const Layout = () => {
    return (
        <>
            <SideBar />
            <ToolBar />
            <Outlet />
        </>
    );
};

export default Layout;
