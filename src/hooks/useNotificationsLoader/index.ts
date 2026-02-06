import { useState, useEffect, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface UseNotificationsLoaderReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  loadNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

/**
 * Hook para cargar y gestionar notificaciones
 * 
 * @param {boolean} autoLoad - Si debe cargar automáticamente al montar el componente
 * @param {number} pollInterval - Intervalo en ms para actualizar notificaciones (0 para desactivar)
 * @returns {UseNotificationsLoaderReturn} Estado y funciones para gestionar notificaciones
 * 
 * @example
 * ```tsx
 * const { notifications, unreadCount, markAsRead } = useNotificationsLoader(true, 30000);
 * 
 * return (
 *   <div>
 *     <Badge>{unreadCount}</Badge>
 *     {notifications.map(notif => (
 *       <NotificationItem key={notif.id} notification={notif} onRead={markAsRead} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useNotificationsLoader = (
  autoLoad: boolean = true,
  pollInterval: number = 0
): UseNotificationsLoaderReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implementar llamada al API para obtener notificaciones
      // const response = await api.get('/notifications');
      // setNotifications(response.data);
      
      // Simulación temporal
      const mockNotifications: Notification[] = [
        // {
        //   id: "1",
        //   title: "Nueva actualización",
        //   message: "Hay una nueva versión disponible",
        //   type: "info",
        //   read: false,
        //   createdAt: new Date().toISOString(),
        // },
      ];
      setNotifications(mockNotifications);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load notifications"));
      setIsLoading(false);
      console.error("Error loading notifications:", err);
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      // TODO: Implementar llamada al API para marcar como leída
      // await api.patch(`/notifications/${id}/read`);
      
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      // TODO: Implementar llamada al API para marcar todas como leídas
      // await api.patch('/notifications/read-all');
      
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  }, []);

  const deleteNotification = useCallback(async (id: string) => {
    try {
      // TODO: Implementar llamada al API para eliminar notificación
      // await api.delete(`/notifications/${id}`);
      
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  }, []);

  const refreshNotifications = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    if (autoLoad) {
      loadNotifications();
    }
  }, [autoLoad, loadNotifications]);

  useEffect(() => {
    if (pollInterval > 0) {
      const interval = setInterval(() => {
        loadNotifications();
      }, pollInterval);

      return () => clearInterval(interval);
    }
  }, [pollInterval, loadNotifications]);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refreshNotifications,
  };
};
