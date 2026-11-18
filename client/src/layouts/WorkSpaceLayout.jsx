import { Navigate, Outlet, useLocation } from "react-router-dom"
import WorkspaceNavigation from "../workspace/shared/components/WorkspaceNavigation"
import { useFetchApi } from "../coustom-hooks/UseCallApi";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect } from "react";
import localforage from 'localforage'

const WorkSpaceLayout = () => {

    const role = "manager";
    const isWorkspaceLoading = false;

    const { pathname } = useLocation()
    const hideNavbar = pathname === "/work-space"

    const { data, isLoading } = useFetchApi(
        ["workspace"],
        "workspaces/",
        {
            staleTime: Infinity
        }
    )

    useEffect(() => {
        if (data?.data) {
            localforage.setItem("workspaceData", data.data).catch((err) => console.error("Failed to save to IndexedDB:", err))
        }
    }, [data])

    if (isLoading) return <LoadingScreen message="Fetching Workspaces" />

    console.log(data?.data);

    if (data?.data?.length === 0) {
        return <Navigate to="/onboarding" replace />
    }

    return (
        <div className="flex flex-col">
            {!hideNavbar && <WorkspaceNavigation role={role} />}
            <Outlet context={{ role, isWorkspaceLoading }} />
        </div>
    )
}

export default WorkSpaceLayout