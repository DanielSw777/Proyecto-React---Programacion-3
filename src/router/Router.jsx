import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import Albums from "../pages/Albums/Albums";
import AlbumDetails from "../pages/AlbumDetails/AlbumDetails";
import Songs from "../pages/Songs/Songs";
import Artists from "../pages/Artists/Artists";
import ArtistDetails from "../pages/ArtistDetails/ArtistDetails";
import Genres from "../pages/Genres/Genres";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import AddSong from "../pages/AddSong/AddSong";

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
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile-edit",
                element: (
                    <ProtectedRoute>
                        <EditProfile />
                    </ProtectedRoute>
                )
            },
            {
                path: "/albums",
                element: <Albums />
            },
            {
                path: "/albums/:id",
                element: <AlbumDetails />
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
                path: "/artists/:id",
                element: <ArtistDetails />
            },
            {
                path: "/genres",
                element: <Genres />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/add-song",
                element: (
                    <ProtectedRoute>
                        <AddSong />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

export default Router;
