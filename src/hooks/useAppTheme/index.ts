import { useState, useEffect } from "react";

export type Theme = "light" | "dark" | "system";

export interface UseAppThemeReturn {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Hook para manejar el tema de la aplicación (light/dark/system)
 * 
 * @returns {UseAppThemeReturn} Objeto con el estado del tema y funciones para cambiarlo
 * 
 * @example
 * ```tsx
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useAppTheme();
 * 
 * return (
 *   <div data-theme={resolvedTheme}>
 *     <button onClick={toggleTheme}>Toggle Theme</button>
 *   </div>
 * );
 * ```
 */
export const useAppTheme = (): UseAppThemeReturn => {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Cargar tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Resolver el tema basado en la preferencia del sistema o el tema seleccionado
    const resolveTheme = () => {
      if (theme === "system") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setResolvedTheme(systemPrefersDark ? "dark" : "light");
      } else {
        setResolvedTheme(theme);
      }
    };

    resolveTheme();

    // Aplicar tema al documento
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.body.className = resolvedTheme;

    // Escuchar cambios en la preferencia del sistema
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => resolveTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      // Si es "system", alternar entre light y dark
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(systemPrefersDark ? "light" : "dark");
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
};
