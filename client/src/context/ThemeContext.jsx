import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme')
            if (stored) return stored
        }
        return 'dark' // defualt
    })

    useEffect(() => {

        const root = document.documentElement

        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }

        localStorage.setItem('theme', theme)

    }, [theme])

    const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark")

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider

export const useTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return { theme, toggleTheme }
}