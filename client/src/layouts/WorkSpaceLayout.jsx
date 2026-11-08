import { Outlet, useLocation } from "react-router-dom"
import WorkspaceNavigation from "../workspace/shared/components/WorkspaceNavigation"

const WorkSpaceLayout = () => {

    const role = "manager";
    const isWorkspaceLoading = false;

    const { pathname } = useLocation()
    const hideNavbar = pathname === "/work-space"

    return (
        <div className="flex flex-col">
            {!hideNavbar && <WorkspaceNavigation role={role} />}
            <Outlet context={{ role, isWorkspaceLoading }} />
        </div>
    )
}

export default WorkSpaceLayout