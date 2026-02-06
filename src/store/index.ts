/**
 * Store centralizado usando Zustand
 * 
 * Exporta todos los stores de la aplicación
 * 
 * @example
 * ```tsx
 * import { useAuthStore, useThemeStore, useAppStore } from "@/store";
 * 
 * const { user, login } = useAuthStore();
 * const { theme, toggleTheme } = useThemeStore();
 * const { notifications, addNotification } = useAppStore();
 * ```
 */

export * from "./useAuthStore";
export * from "./useThemeStore";
export * from "./useAppStore";
