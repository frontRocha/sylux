import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthFirebase } from "../../Context/Auth"

import { Children } from "../../Interfaces/RouterInterface/RouterInterface"

export const PrivateAcessLogin = ({ children }: Children): React.ReactElement => {
    const { isAuthenticated, loading } = useContext(AuthFirebase);

    if (loading) {
        return <p>Carregando...</p>;
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    };

    return children;
};

export const PrivateAcessToSystem = ({ children }: Children): React.ReactElement => {
    const { isAuthenticated, loading } = useContext(AuthFirebase);

    if (loading) {
        return <p>Carregando...</p>;
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    };

    return children;
};