import { lazy } from "react"
import { Route } from "react-router-dom"

import GlobalLayout from "../layouts/GlobalLayout"
import ProtectedRoute from "../configs/ProtectedRoute"
import LazyLoad from "../configs/LazyLoad"

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
                <Route path="/login" element={
                    <LazyLoad>
                        <Login />
                    </LazyLoad>
                } />
                <Route path="/" element={
                    <LazyLoad>
                        <Landing />
                    </LazyLoad>
                } />


                <Route element={<ProtectedRoute />}>
                    <Route path="/onboarding" element={
                        <LazyLoad>
                            <Onboarding />
                        </LazyLoad>
                    } />
                    <Route path="/dashboard" element={
                        <LazyLoad>
                            <Dashboard />
                        </LazyLoad>
                    } />
                    <Route path="/chats" element={
                        <LazyLoad>
                            <Chats />
                        </LazyLoad>
                    } />
                    <Route path="/friends" element={
                        <LazyLoad>
                            <Friends />
                        </LazyLoad>
                    } />
                    <Route path="/settings" element={
                        <LazyLoad>
                            <Settings />
                        </LazyLoad>
                    } />
                </Route>

            </Route>
        </>
    )
}

export default GlobalRoutes