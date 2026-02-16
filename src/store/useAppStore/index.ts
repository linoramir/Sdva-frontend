import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

interface AppState {
  // Estado de inicialización
  isInitialized: boolean;
  isLoading: boolean;
  
  // Notificaciones
  notifications: Notification[];
  unreadCount: number;
  
  // UI State
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  
  // Actions - Inicialización
  setInitialized: (isInitialized: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Actions - Notificaciones
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  // Actions - UI
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

/**
 * Store principal de la aplicación usando Zustand
 * 
 * Maneja estado global de la aplicación como notificaciones,
 * estado de UI, y estado de inicialización
 * 
 * @example
 * ```tsx
 * const { notifications, addNotification, sidebarOpen, toggleSidebar } = useAppStore();
 * 
 * addNotification({
 *   title: "Éxito",
 *   message: "Operación completada",
 *   type: "success",
 * });
 * ```
 */
export const useAppStore = create<AppState>((set, get) => ({
  // Estado inicial
  isInitialized: false,
  isLoading: false,
  notifications: [],
  sidebarOpen: true,
  mobileMenuOpen: false,

  // Computed
  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length;
  },

  // Actions - Inicialización
  setInitialized: (isInitialized) =>
    set({ isInitialized }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  // Actions - Notificaciones
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: `notif-${Date.now()}-${Math.random()}`,
          createdAt: new Date().toISOString(),
          read: false,
        },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearNotifications: () =>
    set({ notifications: [] }),

  // Actions - UI
  setSidebarOpen: (open) =>
    set({ sidebarOpen: open }),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setMobileMenuOpen: (open) =>
    set({ mobileMenuOpen: open }),

  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));
