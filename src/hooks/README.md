# Hooks

Esta carpeta contiene los hooks personalizados de la aplicación.

## Hooks disponibles

### `useAuth`
Hook para manejar la autenticación de usuarios.
- Login, logout, registro
- Estado de autenticación
- Datos del usuario

### `useAppTheme`
Hook para manejar el tema de la aplicación (light/dark/system).
- Cambio de tema
- Persistencia en localStorage
- Detección de preferencia del sistema

### `usePlatform`
Hook para detectar la plataforma y características del dispositivo.
- Detección de móvil/tablet/desktop
- Tipo de dispositivo (iOS, Android, etc.)
- Dimensiones de pantalla
- Detección de dispositivo táctil

### `useInitialApp`
Hook para inicializar la aplicación.
- Carga de datos iniciales
- Verificación de autenticación
- Carga de preferencias
- Barra de progreso

### `useNotificationsLoader`
Hook para cargar y gestionar notificaciones.
- Carga de notificaciones
- Marcar como leídas
- Eliminar notificaciones
- Auto-refresh configurable

## Uso

```tsx
import { useAuth, useAppTheme, usePlatform } from "@/hooks";

const MyComponent = () => {
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useAppTheme();
  const { isMobile, platform } = usePlatform();
  
  // ...
};
```

## Agregar nuevos hooks

1. Crear una nueva carpeta con el nombre del hook (ej: `useMyHook`)
2. Crear un archivo `index.ts` dentro de la carpeta
3. Exportar el hook desde `src/hooks/index.ts`
