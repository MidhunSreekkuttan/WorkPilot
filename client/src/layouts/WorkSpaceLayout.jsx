import { Outlet } from "react-router-dom"
import WorkspaceNavigation from "../workspace/shared/components/WorkspaceNavigation"

const WorkSpaceLayout = () => {
    return (
        <div className="flex flex-col">
            <WorkspaceNavigation role={["manager"]} />
            <Outlet />
        </div>
    )
}

export default WorkSpaceLayout