/**
 * Sistema de navegación y control de acceso
 * 
 * Define rutas, roles, permisos y guards en un solo archivo
 */

// ============================================================================
// ROLES
// ============================================================================

export enum ROLE {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

export interface RolePermissions {
  canViewDashboard: boolean;
  canManageUsers: boolean;
  canViewReports: boolean;
  canManageReports: boolean;
  canViewAnalytics: boolean;
  canManageSettings: boolean;
  canDeleteData: boolean;
}

export const rolePermissions: Record<ROLE, RolePermissions> = {
  [ROLE.ADMIN]: {
    canViewDashboard: true,
    canManageUsers: true,
    canViewReports: true,
    canManageReports: true,
    canViewAnalytics: true,
    canManageSettings: true,
    canDeleteData: true,
  },
  [ROLE.MANAGER]: {
    canViewDashboard: true,
    canManageUsers: true,
    canViewReports: true,
    canManageReports: true,
    canViewAnalytics: false,
    canManageSettings: false,
    canDeleteData: false,
  },
  [ROLE.USER]: {
    canViewDashboard: true,
    canManageUsers: false,
    canViewReports: true,
    canManageReports: false,
    canViewAnalytics: false,
    canManageSettings: false,
    canDeleteData: false,
  },
};

export const getRolePermissions = (role: ROLE): RolePermissions => {
  return rolePermissions[role] || rolePermissions[ROLE.USER];
};

export const hasPermission = (
  role: ROLE,
  permission: keyof RolePermissions
): boolean => {
  const permissions = getRolePermissions(role);
  return permissions[permission];
};

export const hasAllPermissions = (
  role: ROLE,
  permissions: Array<keyof RolePermissions>
): boolean => {
  return permissions.every((permission) => hasPermission(role, permission));
};

export const hasAnyPermission = (
  role: ROLE,
  permissions: Array<keyof RolePermissions>
): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};

export const getRoleHierarchy = (role: ROLE): number => {
  const hierarchy: Record<ROLE, number> = {
    [ROLE.ADMIN]: 3,
    [ROLE.MANAGER]: 2,
    [ROLE.USER]: 1,
  };
  return hierarchy[role] || 0;
};

export const hasRoleOrHigher = (userRole: ROLE, requiredRole: ROLE): boolean => {
  return getRoleHierarchy(userRole) >= getRoleHierarchy(requiredRole);
};

// ============================================================================
// RUTAS
// ============================================================================

export enum APP_ROUTES {
  // Rutas públicas
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  
  // Rutas privadas
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  USERS = "/dashboard/users",
  REPORTS = "/dashboard/reports",
  ANALYTICS = "/dashboard/analytics",
}

export interface RouteConfig {
  path: APP_ROUTES | string;
  name: string;
  isPublic: boolean;
  roles?: ROLE[] | string[]; // Roles permitidos (undefined = todos los roles autenticados)
  requiresAuth?: boolean;
  component?: string;
  meta?: {
    title?: string;
    description?: string;
    icon?: string;
    showInNav?: boolean;
  };
}

export const APP_ROUTES_CONFIG: Record<string, RouteConfig> = {
  // Rutas públicas
  [APP_ROUTES.HOME]: {
    path: APP_ROUTES.HOME,
    name: "Home",
    isPublic: true,
    requiresAuth: false,
    meta: {
      title: "Inicio",
      showInNav: true,
    },
  },
  [APP_ROUTES.LOGIN]: {
    path: APP_ROUTES.LOGIN,
    name: "Login",
    isPublic: true,
    requiresAuth: false,
    meta: {
      title: "Iniciar Sesión",
      showInNav: false,
    },
  },
  [APP_ROUTES.REGISTER]: {
    path: APP_ROUTES.REGISTER,
    name: "Register",
    isPublic: true,
    requiresAuth: false,
    meta: {
      title: "Registrarse",
      showInNav: false,
    },
  },
  [APP_ROUTES.FORGOT_PASSWORD]: {
    path: APP_ROUTES.FORGOT_PASSWORD,
    name: "ForgotPassword",
    isPublic: true,
    requiresAuth: false,
    meta: {
      title: "Recuperar Contraseña",
      showInNav: false,
    },
  },
  
  // Rutas privadas
  [APP_ROUTES.DASHBOARD]: {
    path: APP_ROUTES.DASHBOARD,
    name: "Dashboard",
    isPublic: false,
    requiresAuth: true,
    meta: {
      title: "Dashboard",
      showInNav: true,
      icon: "dashboard",
    },
  },
  [APP_ROUTES.USERS]: {
    path: APP_ROUTES.USERS,
    name: "Users",
    isPublic: false,
    requiresAuth: true,
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    meta: {
      title: "Gestión de Usuarios",
      showInNav: true,
      icon: "users",
    },
  },
  [APP_ROUTES.REPORTS]: {
    path: APP_ROUTES.REPORTS,
    name: "Reports",
    isPublic: false,
    requiresAuth: true,
    roles: [ROLE.ADMIN, ROLE.MANAGER, ROLE.USER],
    meta: {
      title: "Reportes",
      showInNav: true,
      icon: "reports",
    },
  },
  [APP_ROUTES.ANALYTICS]: {
    path: APP_ROUTES.ANALYTICS,
    name: "Analytics",
    isPublic: false,
    requiresAuth: true,
    roles: [ROLE.ADMIN],
    meta: {
      title: "Analíticas",
      showInNav: true,
      icon: "analytics",
    },
  },
  [APP_ROUTES.PROFILE]: {
    path: APP_ROUTES.PROFILE,
    name: "Profile",
    isPublic: false,
    requiresAuth: true,
    meta: {
      title: "Perfil",
      showInNav: true,
      icon: "profile",
    },
  },
  [APP_ROUTES.SETTINGS]: {
    path: APP_ROUTES.SETTINGS,
    name: "Settings",
    isPublic: false,
    requiresAuth: true,
    meta: {
      title: "Configuración",
      showInNav: true,
      icon: "settings",
    },
  },
};

export const routes: RouteConfig[] = Object.values(APP_ROUTES_CONFIG);

// ============================================================================
// GUARDS Y HELPERS
// ============================================================================

export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter((route) => route.isPublic);
};

export const getPrivateRoutes = (): RouteConfig[] => {
  return routes.filter((route) => !route.isPublic && route.requiresAuth);
};

export const getNavRoutes = (): RouteConfig[] => {
  return routes.filter((route) => route.meta?.showInNav);
};

export const isRouteProtected = (path: string): boolean => {
  const route = routes.find((r) => r.path === path);
  return route?.requiresAuth === true;
};

export const hasRouteAccess = (path: string, userRole?: ROLE | string): boolean => {
  const route = routes.find((r) => r.path === path);
  
  if (!route) return false;
  
  // Si es ruta pública, siempre tiene acceso
  if (route.isPublic) return true;
  
  // Si requiere auth pero no hay usuario, no tiene acceso
  if (route.requiresAuth && !userRole) return false;
  
  // Si no tiene roles específicos, cualquier usuario autenticado tiene acceso
  if (!route.roles || route.roles.length === 0) return true;
  
  // Verificar si el rol del usuario está en la lista de roles permitidos
  return route.roles.includes(userRole as string);
};

export const canAccessRoute = (
  path: string,
  isAuthenticated: boolean,
  userRole?: ROLE | string
): boolean => {
  return hasRouteAccess(path, userRole as string);
};

export const getRedirectPath = (
  isAuthenticated: boolean,
  intendedPath?: string
): string => {
  if (isAuthenticated) {
    if (intendedPath === APP_ROUTES.LOGIN || intendedPath === APP_ROUTES.REGISTER) {
      return APP_ROUTES.DASHBOARD;
    }
    return intendedPath || APP_ROUTES.DASHBOARD;
  } else {
    if (intendedPath && hasRouteAccess(intendedPath)) {
      return APP_ROUTES.LOGIN;
    }
    return APP_ROUTES.HOME;
  }
};

export const requireAuth = (isAuthenticated: boolean): boolean => {
  return isAuthenticated;
};

export const requireRole = (
  userRole: ROLE | string | undefined,
  allowedRoles: ROLE[] | string[]
): boolean => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole as string);
};

export const requireAll = (...conditions: boolean[]): boolean => {
  return conditions.every((condition) => condition === true);
};

export const requireAny = (...conditions: boolean[]): boolean => {
  return conditions.some((condition) => condition === true);
};
