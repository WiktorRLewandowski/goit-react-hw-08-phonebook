import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
    const { isLogged } = useAuth()
    
    return isLogged ? <Navigate to={redirectTo} /> : Component
}