import { useState, useEffect } from "react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

/**
 * Hook para manejar la autenticación de usuarios
 * 
 * @returns {UseAuthReturn} Objeto con el estado de autenticación y funciones relacionadas
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * if (isAuthenticated) {
 *   return <div>Bienvenido {user.name}</div>;
 * }
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Verificar token en localStorage/sessionStorage
    // TODO: Validar token con el backend
    // TODO: Cargar datos del usuario autenticado
    
    // Simulación de carga inicial
    const checkAuth = async () => {
      try {
        // const token = localStorage.getItem('token');
        // if (token) {
        //   const userData = await validateToken(token);
        //   setUser(userData);
        // }
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // TODO: Implementar llamada al API de login
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      // localStorage.setItem('token', token);
      // setUser(user);
      
      // Simulación temporal
      console.log("Login:", { email, password });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // TODO: Implementar llamada al API de logout
      // await api.post('/auth/logout');
      // localStorage.removeItem('token');
      
      setUser(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // TODO: Implementar llamada al API de registro
      // const response = await api.post('/auth/register', { email, password, name });
      // const { token, user } = response.data;
      // localStorage.setItem('token', token);
      // setUser(user);
      
      // Simulación temporal
      console.log("Register:", { email, password, name });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };
};
