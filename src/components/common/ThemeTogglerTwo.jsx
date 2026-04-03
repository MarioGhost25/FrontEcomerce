import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
export default function ThemeTogglerTwo() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="inline-flex items-center justify-center text-white transition-colors rounded-full size-14 bg-brand-500 hover:bg-brand-600">
      <Sun className="hidden dark:block" width={20} height={20} />
      <Moon className="dark:hidden" width={20} height={20} />
    </button>);
}
