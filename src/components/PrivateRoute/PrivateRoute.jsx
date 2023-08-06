import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
    const { isLogged, isRefreshing } = useAuth()
    const shouldRedirect = !isLogged && !isRefreshing 
    
    return shouldRedirect ? <Navigate to={redirectTo} /> : Component
}