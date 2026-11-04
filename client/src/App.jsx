import { lazy, Suspense } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import LoadingScreen from "./components/LoadingScreen"

const SideBar = lazy(() => import("./components/SideBar"))
const Footer = lazy(() => import("./components/Footer"))
const Navbar = lazy(() => import("./components/Navbar"))
const Landing = lazy(() => import("./pages/Landing"))
const Login = lazy(() => import("./pages/Login"))
const Onboarding = lazy(() => import("./pages/Onboarding"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

function LayoutWraper({ children }) {
  const { pathname } = useLocation()
  const hideComp = ["/", "/login", "/onboarding"].includes(pathname)
  return (
    <>
      <div className="flex">
        {!hideComp && <SideBar />}
        <div className="flex-1">
          {!hideComp && <Navbar />}
          {children}
        </div>
      </div>
      {!hideComp && <Footer />}
    </>
  )
}

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <LayoutWraper>
          <Routes>

            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </LayoutWraper>
      </Suspense>
    </>
  )
}

export default App