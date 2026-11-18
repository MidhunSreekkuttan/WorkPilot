import { Route } from "react-router-dom"
import { lazy } from "react"

import WorkSpaceLayout from "../layouts/WorkSpaceLayout"
import ProtectedRoute from "../workspace/shared/components/ProtectedRoute"
import LazyLoad from "../configs/LazyLoad"

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
                <Route index element={
                    <LazyLoad>
                        <WorkspaceOverview />
                    </LazyLoad>
                } />

                <Route path=":workspaceId">

                    <Route index element={
                        <LazyLoad>
                            <Workspace />
                        </LazyLoad>
                    } />
                    <Route path="projects" element={
                        <LazyLoad>
                            <WorkspaceProjects />
                        </LazyLoad>
                    } />
                    <Route path="projects/:projectId" element={
                        <LazyLoad>
                            <ProjectDetails />
                        </LazyLoad>
                    } />
                    <Route path="files" element={
                        <LazyLoad>
                            <WorkspaceFiles />
                        </LazyLoad>
                    } />

                    {/* Manager-only pages */}
                    <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>

                        <Route path="tasks" element={
                            <LazyLoad>
                                <ManageTasks />
                            </LazyLoad>
                        } />
                        <Route path="members" element={
                            <LazyLoad>
                                <ManageMembers />
                            </LazyLoad>
                        } />
                        <Route path="settings" element={
                            <LazyLoad>
                                <WorkspaceSettings />
                            </LazyLoad>
                        } />

                    </Route>

                    {/* Member-only pages */}
                    <Route element={<ProtectedRoute allowedRoles={["member"]} />}>

                        <Route path="my-tasks" element={
                            <LazyLoad>
                                <MyTasks />
                            </LazyLoad>
                        } />

                    </Route>

                </Route>
            </Route>
        </>
    )
}

export default WorkSpaceRoutes