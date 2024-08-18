import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth("state");
    const location = useLocation();

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />;
}

export default ProtectedRoute;
