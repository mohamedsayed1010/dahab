import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();



  return (
    <button
      onClick={toggleTheme}
      className=" rounded-lg text-primary transition-all duration-300"
      aria-label={theme === "dark" ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
    >
      {theme === "dark" ? (
        <Sun size={25} />
      ) : (
        <Moon size={25} />
      )}
    </button>
  );
}