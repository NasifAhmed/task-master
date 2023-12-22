import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const authContext = useContext(AuthContext);
    const { user, loading } = authContext;
    const location = useLocation();
    console.log(location.pathname);

    if (authContext === null) {
        return <Navigate state={location.pathname} to="/register"></Navigate>;
    }

    if (!user && !loading) {
        return <Navigate state={location.pathname} to="/login"></Navigate>;
    }

    return children;
};

export default PrivateRoute;
