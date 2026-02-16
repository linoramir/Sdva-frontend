# Navigation

Sistema de navegación y control de acceso basado en rutas y roles.

**Todo está definido en un solo archivo: `index.ts`**

## Estructura del archivo

El archivo `index.ts` contiene tres secciones principales:

1. **ROLES** - Definición de roles y permisos
2. **RUTAS** - Configuración de rutas públicas y privadas
3. **GUARDS** - Funciones de protección y helpers

## Roles disponibles

- `ADMIN`: Acceso completo al sistema
- `MANAGER`: Gestión de usuarios y reportes
- `USER`: Usuario estándar con acceso básico

## Uso

### Verificar acceso a una ruta

```tsx
import { canAccessRoute, ROLE, APP_ROUTES } from "@/navigation";

const MyComponent = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!canAccessRoute(APP_ROUTES.USERS, isAuthenticated, user?.role)) {
    return <Redirect to="/unauthorized" />;
  }
  
  return <UsersPage />;
};
```

### Verificar permisos

```tsx
import { hasPermission, ROLE } from "@/navigation";

const MyComponent = () => {
  const { user } = useAuth();
  
  if (hasPermission(user.role as ROLE, "canManageUsers")) {
    return <UserManagementButton />;
  }
  
  return null;
};
```

### Obtener rutas según rol

```tsx
import { getNavRoutes, hasRouteAccess } from "@/navigation";

const Navigation = () => {
  const { user, isAuthenticated } = useAuth();
  
  const availableRoutes = getNavRoutes().filter(route => 
    hasRouteAccess(route.path, user?.role)
  );
  
  return (
    <nav>
      {availableRoutes.map(route => (
        <Link key={route.path} to={route.path}>{route.meta.title}</Link>
      ))}
    </nav>
  );
};
```

### Usar rutas con roles específicos

```tsx
import { APP_ROUTES, APP_ROUTES_CONFIG } from "@/navigation";

// Obtener configuración de una ruta específica
const dashboardRoute = APP_ROUTES_CONFIG[APP_ROUTES.DASHBOARD];

// Las rutas pueden tener roles específicos definidos
const usersRoute = APP_ROUTES_CONFIG[APP_ROUTES.USERS];
// usersRoute.roles = [ROLE.ADMIN, ROLE.MANAGER]
```

## Agregar nuevas rutas

1. Agregar la ruta al enum `APP_ROUTES` en `index.ts`
2. Agregar la configuración al objeto `APP_ROUTES_CONFIG`
3. Especificar si es pública/privada y qué roles tienen acceso

Ejemplo:

```ts
export enum APP_ROUTES {
  // ... otras rutas
  NEW_FEATURE = "/dashboard/new-feature",
}

export const APP_ROUTES_CONFIG: Record<string, RouteConfig> = {
  // ... otras configuraciones
  [APP_ROUTES.NEW_FEATURE]: {
    path: APP_ROUTES.NEW_FEATURE,
    name: "NewFeature",
    isPublic: false,
    requiresAuth: true,
    roles: [ROLE.ADMIN],
    meta: {
      title: "Nueva Funcionalidad",
      showInNav: true,
      icon: "feature",
    },
  },
};
```

## Agregar nuevos roles

1. Agregar el rol al enum `ROLE` en `index.ts`
2. Definir los permisos del rol en `rolePermissions`
3. Actualizar las rutas que requieren el nuevo rol
