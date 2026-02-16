import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setResolvedTheme: (theme: "light" | "dark") => void;
}

/**
 * Store de tema usando Zustand
 * 
 * Persiste la preferencia de tema en localStorage
 * 
 * @example
 * ```tsx
 * const { theme, setTheme, toggleTheme } = useThemeStore();
 * 
 * return (
 *   <div data-theme={theme}>
 *     <button onClick={toggleTheme}>Toggle Theme</button>
 *   </div>
 * );
 * ```
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "light",

      setTheme: (theme) => {
        set({ theme });
        
        // Resolver tema basado en preferencia del sistema si es necesario
        if (theme === "system") {
          const systemPrefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          set({ resolvedTheme: systemPrefersDark ? "dark" : "light" });
        } else {
          set({ resolvedTheme: theme });
        }
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        if (currentTheme === "light") {
          get().setTheme("dark");
        } else if (currentTheme === "dark") {
          get().setTheme("light");
        } else {
          // Si es "system", alternar entre light y dark
          const systemPrefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          get().setTheme(systemPrefersDark ? "light" : "dark");
        }
      },

      setResolvedTheme: (resolvedTheme) => {
        set({ resolvedTheme });
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);
