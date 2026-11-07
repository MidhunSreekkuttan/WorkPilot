import { Outlet, useLocation } from "react-router-dom"
import SideBar from "../components/SideBar"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const GlobalLayout = () => {
    const { pathname } = useLocation()
    const hideComp = ["/", "/login", "/onboarding"].includes(pathname)
    const hideFooter = ["/dashboard", "/chats", "/friends", "/settings", "/login"].includes(pathname)
    return (
        <>
            <div className="flex">
                {!hideComp && <SideBar />}
                <div className="flex-1">
                    {!hideComp && <Navbar />}
                    <Outlet />
                </div>
            </div>
            {!hideFooter && <Footer />}
        </>
    )
}

export default GlobalLayout