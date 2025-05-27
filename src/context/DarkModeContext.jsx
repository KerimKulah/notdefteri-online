import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {

        if (typeof window !== "undefined") {
            return localStorage.theme === "dark" ||
                (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        return false;
    });

    const toggleDarkMode = () => {
        setDarkMode((d) => !d);
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.theme = darkMode ? "dark" : "light";
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

