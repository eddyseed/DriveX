import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the context type
interface MenuContextType {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    navbarHeight: string;
    setNavbarHeight: (height: string) => void;
}

// Create the context with default values
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Provider component
export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState("auto");
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    useEffect(() => {
        const updateNavbarHeight = () => {
            if (window.innerWidth <= 768) {
                
                setNavbarHeight(isMenuOpen ? "100vh" : "0");
            } else {
                setNavbarHeight("auto"); 
            }
        };
        
        if (window.innerWidth <= 768) updateNavbarHeight();
        window.addEventListener("resize", updateNavbarHeight);
        return () => window.removeEventListener("resize", updateNavbarHeight);
    }, [isMenuOpen]);


    return (
        <MenuContext.Provider value={{ isMenuOpen, toggleMenu, navbarHeight, setNavbarHeight }}>
            {children}
        </MenuContext.Provider>
    );
};

// Custom hook to use the context
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};
