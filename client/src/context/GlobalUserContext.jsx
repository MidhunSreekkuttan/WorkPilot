import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import AxiosInstance from "../configs/AxiosInstance";

export const GlobalUserContext = createContext()

const GlobalUserContextProvider = ({ children }) => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const authUser = async () => {
            try {

                const { data } = await AxiosInstance.get('/auth/authUser/')

                setUserData(data)

            } catch (error) {
                console.log(error?.response?.data);
            } finally {
                setIsLoading(false)
            }
        }

        authUser()

    }, [])

    useEffect(() => {

        const handleSessionExpired = () => {
            setUserData(null)
            navigate('/login', { replace: true })
        }

        window.addEventListener("auth:session-expired", handleSessionExpired)

        return () => window.removeEventListener("auth:session-expired", handleSessionExpired)

    }, [navigate])

    const values = {
        userData,
        setUserData,
        isLoading,
        isAuthenticated: Boolean(userData)
    }

    return (
        <GlobalUserContext.Provider value={values}>
            {children}
        </GlobalUserContext.Provider>
    )
}

export default GlobalUserContextProvider

export const useGlobalUserContext = () => {
    const { userData, setUserData, isLoading, isAuthenticated } = useContext(GlobalUserContext)
    return { userData, setUserData, isLoading, isAuthenticated }
}