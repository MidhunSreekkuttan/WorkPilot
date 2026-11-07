import { lazy } from "react"
import { Route } from "react-router-dom"

import GlobalLayout from "../layouts/GlobalLayout"

const Landing = lazy(() => import("../pages/Landing"))
const Login = lazy(() => import("../pages/Login"))
const Onboarding = lazy(() => import("../pages/Onboarding"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const Chats = lazy(() => import("../pages/Chats"))
const Friends = lazy(() => import("../pages/Friends"))
const Settings = lazy(() => import("../pages/Settings"))

const GlobalRoutes = () => {
    return (
        <>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </>
    )
}

export default GlobalRoutes