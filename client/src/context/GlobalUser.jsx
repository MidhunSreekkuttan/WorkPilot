import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../configs/AxiosInstance";
import { useNavigate } from "react-router-dom";

export const GlobalUserContext = createContext()

const GlobalUserContextProvider = ({ children }) => {

    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const accessToken = localStorage.getItem("access_token")

    const authUser = async () => {

        if (!accessToken) {
            navigate("/login", { replace: true })
            setUserData(null)
            setIsLoading(false)
            return
        }

        try {
            setIsLoading(true)

            const { data } = await AxiosInstance.get("/api/auth/authUser/")

            setUserData(data);

        } catch (error) {
            console.log(error.response?.data || error.response?.data?.message || "Unable to fetch user");
            navigate("/login")

            setUserData(null);
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        authUser()
    }, [navigate])

    const values = {
        userData,
        isLoading,
        authUser
    }

    return (
        <GlobalUserContext.Provider value={values}>
            {children}
        </GlobalUserContext.Provider>
    )
}

export default GlobalUserContextProvider

export const useGlobalUserContext = () => {
    const { userData, isLoading, authUser } = useContext(GlobalUserContext)
    return { userData, isLoading, authUser }
}