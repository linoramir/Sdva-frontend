# Store (Zustand)

Gestión de estado global usando Zustand.

**Cada store está en su propia carpeta con un archivo `index.ts`**

## Instalación

```bash
npm install zustand
```

## Estructura

```
store/
├── index.ts                    # Exporta todos los stores
├── useAuthStore/
│   └── index.ts               # Store de autenticación
├── useThemeStore/
│   └── index.ts               # Store de tema
└── useAppStore/
    └── index.ts               # Store principal de la app
```

## Stores disponibles

### `useAuthStore`
Store para manejar la autenticación.
- Usuario autenticado
- Token de acceso
- Estado de autenticación
- Persistencia en localStorage

### `useThemeStore`
Store para manejar el tema de la aplicación.
- Tema actual (light/dark/system)
- Tema resuelto
- Persistencia en localStorage

### `useAppStore`
Store principal de la aplicación.
- Estado de inicialización
- Notificaciones
- Estado de UI (sidebar, menú móvil)

## Uso

### Store de autenticación

```tsx
import { useAuthStore } from "@/store";

const LoginComponent = () => {
  const { login, user, isAuthenticated } = useAuthStore();
  
  const handleLogin = async () => {
    const userData = { id: "1", email: "user@example.com", name: "User", role: "user" };
    const token = "abc123";
    login(userData, token);
  };
  
  if (isAuthenticated) {
    return <div>Bienvenido {user.name}</div>;
  }
  
  return <button onClick={handleLogin}>Login</button>;
};
```

### Store de tema

```tsx
import { useThemeStore } from "@/store";

const ThemeToggle = () => {
  const { theme, toggleTheme, resolvedTheme } = useThemeStore();
  
  return (
    <button onClick={toggleTheme}>
      Tema actual: {resolvedTheme}
    </button>
  );
};
```

### Store de aplicación

```tsx
import { useAppStore } from "@/store";

const NotificationComponent = () => {
  const { notifications, addNotification, markNotificationAsRead } = useAppStore();
  
  const handleAddNotification = () => {
    addNotification({
      title: "Nueva notificación",
      message: "Tienes un nuevo mensaje",
      type: "info",
    });
  };
  
  return (
    <div>
      {notifications.map(notif => (
        <div key={notif.id} onClick={() => markNotificationAsRead(notif.id)}>
          {notif.title}
        </div>
      ))}
    </div>
  );
};
```

## Agregar nuevos stores

1. Crear una nueva carpeta con el nombre del store (ej: `useMyStore/`)
2. Crear un archivo `index.ts` dentro de la carpeta
3. Definir la interfaz del estado
4. Crear el store usando `create` de Zustand
5. Exportar desde `src/store/index.ts`

Ejemplo:

```tsx
// src/store/useMyStore/index.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MyState {
  data: string | null;
  setData: (data: string) => void;
}

export const useMyStore = create<MyState>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    {
      name: "my-storage",
    }
  )
);
```

Luego exportar en `src/store/index.ts`:

```tsx
export * from "./useMyStore";
```

## Middleware

Los stores pueden usar middleware de Zustand:
- `persist`: Para persistir estado en localStorage
- `devtools`: Para debugging (en desarrollo)
- `immer`: Para estado inmutable (si se instala)

Ejemplo con persist:

```tsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMyStore = create(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    {
      name: "my-storage",
    }
  )
);
```
