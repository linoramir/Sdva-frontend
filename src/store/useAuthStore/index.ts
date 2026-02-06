import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

/**
 * Store de autenticación usando Zustand
 * 
 * Persiste el estado en localStorage para mantener la sesión
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuthStore();
 * 
 * if (isAuthenticated) {
 *   return <div>Bienvenido {user.name}</div>;
 * }
 * ```
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token) =>
        set({
          token,
        }),

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (isLoading) =>
        set({
          isLoading,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
