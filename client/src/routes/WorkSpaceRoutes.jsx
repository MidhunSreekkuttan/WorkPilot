import { Route } from "react-router-dom"
import { lazy } from "react"

import WorkSpaceLayout from "../layouts/WorkSpaceLayout"
import ProtectedRoute from "../workspace/shared/components/ProtectedRoute"

{/* Shared pages */ }
const WorkspaceOverview = lazy(() => import("../workspace/shared/pages/WorkspaceOverview"))
const Workspace = lazy(() => import("../workspace/shared/pages/Workscpace"))
const WorkspaceProjects = lazy(() => import("../workspace/shared/pages/WorkspaceProjects"))
const ProjectDetails = lazy(() => import("../workspace/shared/pages/ProjectDetails"))
const WorkspaceFiles = lazy(() => import("../workspace/shared/pages/WorkspaceFiles"))

{/* Manager-only pages */ }
const ManageTasks = lazy(() => import("../workspace/managers/pages/ManageTasks"))
const ManageMembers = lazy(() => import("../workspace/managers/pages/ManageMembers"))
const WorkspaceSettings = lazy(() => import("../workspace/managers/pages/WorkspaceSettings"))

{/* Member-only pages */ }
const MyTasks = lazy(() => import("../workspace/members/pages/MyTasks"))

const WorkSpaceRoutes = () => {
    return (
        <>
            <Route path="/work-space" element={<WorkSpaceLayout />}>
                {/* Shared pages */}
                <Route index element={<WorkspaceOverview />} />

                <Route path=":workspaceId">

                    <Route index element={<Workspace />} />
                    <Route path="projects" element={<WorkspaceProjects />} />
                    <Route path="projects/:projectId" element={<ProjectDetails />} />
                    <Route path="files" element={<WorkspaceFiles />} />

                    {/* Manager-only pages */}
                    <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>

                        <Route path="tasks" element={<ManageTasks />} />
                        <Route path="members" element={<ManageMembers />} />
                        <Route path="settings" element={<WorkspaceSettings />} />

                    </Route>

                    {/* Member-only pages */}
                    <Route element={<ProtectedRoute allowedRoles={["member"]} />}>

                        <Route path="my-tasks" element={<MyTasks />} />

                    </Route>

                </Route>
            </Route>
        </>
    )
}

export default WorkSpaceRoutes