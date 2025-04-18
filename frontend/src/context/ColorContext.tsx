import React, { createContext, useContext, useState } from "react";

// Define color variant structure
interface ColorVariants {
    primary: { bgColor: string; fgColor: string };
    darkPrimary: { bgColor: string; fgColor: string };
    darkSecondary: { bgColor: string; fgColor: string };
    warningRed: { bgColor: string; fgColor: string };
    successGreen: { bgColor: string; fgColor: string };
}

// Default colors
const defaultColors: { variants: ColorVariants } = {
    variants: {
        primary: { bgColor: "#BFD7EA", fgColor: "#333333" }, // Columbia Blue + Jet Black
        darkPrimary: { bgColor: "#247BA0", fgColor: "#F7F7FF" }, // Blue + Ghost White
        darkSecondary: { bgColor: "#0B132B", fgColor: "#EEFFDB" }, // Oxford Blue + Nyanza
        warningRed: { bgColor: "#C81D25", fgColor: "#FFFFFF" }, // Red Salsa + White
        successGreen: {bgColor: '#22c55e', fgColor: "#FFFFF"}
    },
};

// Create context
const ColorContext = createContext<{ colors: { variants: ColorVariants } }>({
    colors: defaultColors,
});

// Provider component
export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [colors] = useState(defaultColors);

    return (
        <ColorContext.Provider value={{ colors }}>
            {children}
        </ColorContext.Provider>
    );
};

// Custom hook
export const useColorContext = () => useContext(ColorContext);
