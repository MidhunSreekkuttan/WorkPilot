import { Navigate, Outlet } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"
import { useGlobalUserContext } from "../context/GlobalUserContext"

const ProtectedRoute = () => {

    const { isLoading, isAuthenticated } = useGlobalUserContext()

    if (isLoading) return <LoadingScreen message="Checking authentication..." />
    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <Outlet />

}

export default ProtectedRoute