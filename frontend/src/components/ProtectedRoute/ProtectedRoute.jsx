import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children, anonymous = false }) => {
    const location = useLocation();

    if (anonymous && isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/signin" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;