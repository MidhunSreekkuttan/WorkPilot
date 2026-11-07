import { Navigate, Outlet, useOutletContext } from "react-router-dom"
import LoadingScreen from "../../../components/LoadingScreen"

// Role protection
const ProtectedRoute = ({ allowedRoles }) => {
    const { role, isWorkspaceLoading } = useOutletContext()

    if (isWorkspaceLoading) {
        return <LoadingScreen />
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute