import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        setIsAuthenticated(!!accessToken);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/mainpage" replace />;
};

export default ProtectedRoute;
