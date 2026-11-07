import { Outlet } from "react-router-dom"
import WorkspaceNavigation from "../workspace/shared/components/WorkspaceNavigation"

const WorkSpaceLayout = () => {

    const role = "manager";
    const isWorkspaceLoading = false;

    return (
        <div className="flex flex-col">
            <WorkspaceNavigation role={role} />
            <Outlet context={{ role, isWorkspaceLoading }} />
        </div>
    )
}

export default WorkSpaceLayout