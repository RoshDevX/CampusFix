import { Navigate } from "react-router";

function ProtectedRoute({children, allowedRole}){
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if(!token || !user){
        return <Navigate to="/login" replace />
    }

    if(allowedRole && user.role !== allowedRole){
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;