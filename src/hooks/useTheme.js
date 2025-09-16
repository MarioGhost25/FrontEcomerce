import { useContext } from "react";
// 1. Importa el contexto desde el archivo del provider
import { ThemeContext } from "../context/ThemeContext";

// 2. Exporta el hook desde su propio archivo
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};