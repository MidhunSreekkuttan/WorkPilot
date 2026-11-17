import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../configs/AxiosInstance";

export const GlobalUserContext = createContext()

const GlobalUserContextProvider = ({ children }) => {

    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const authUser = async () => {
            try {

                const { data } = await AxiosInstance.get('/api/auth/authUser/')

                setUserData(data)

            } catch (error) {
                console.log(error?.response?.data);
            } finally {
                setIsLoading(false)
            }
        }


        authUser()

    }, [])

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