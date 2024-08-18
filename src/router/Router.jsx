import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import PlayList from "../pages/PlayList/PlayList";
import Albums from "../pages/Albums/Albums";
import Songs from "../pages/Songs/Songs";
import Artists from "../pages/Artists/Artists";
import Genres from "../pages/Genres/Genres";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/playlist",
                element: <PlayList />
            },
            {
                path: "/albums",
                element: <Albums />
            },
            {
                path: "/songs",
                element: <Songs />
            },
            {
                path: "/artists",
                element: <Artists />
            },
            {
                path: "/genres",
                element: <Genres />
            },
            {
                path: "/settings",
                element: (
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]);

export default Router;
