"use client";

export interface NavbarMenuItem {
  id: string;
  label: string;
  icon: string;
}

export interface NavbarProps {
  activeMenu: string;
  onMenuChange: (id: string) => void;
  isMobile: boolean;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const MENU_ITEMS: NavbarMenuItem[] = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "management", label: "Gestión de boletas", icon: "📄" },
  { id: "trade", label: "Análisis de comercio", icon: "📊" },
  { id: "metrics", label: "Métricas", icon: "📈" },
  { id: "alerts", label: "Alertas", icon: "⚠️" },
];

export const Navbar = ({
  activeMenu,
  onMenuChange,
  isMobile,
  sidebarOpen,
  onToggleSidebar,
}: NavbarProps) => {
  return (
    <>
      {/* Overlay para móvil */}
      {isMobile && sidebarOpen && (
        <div
          onClick={onToggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
        />
      )}

      {/* Sidebar: en móvil oculto por defecto (translateX -100%), se abre con hamburger */}
      <aside
        style={{
          width: isMobile ? "280px" : "250px",
          maxWidth: isMobile ? "85vw" : "none",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          padding: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 999,
          transform:
            isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
          boxShadow:
            isMobile && sidebarOpen ? "2px 0 8px rgba(0,0,0,0.1)" : "none",
          pointerEvents: isMobile && !sidebarOpen ? "none" : "auto",
        }}
      >
        {/* Logo en Sidebar */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1a237e",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <span style={{ fontSize: "28px", marginRight: "8px" }}>W</span>
          WORKLA
        </div>

        {/* Menú de navegación */}
        <nav>
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onMenuChange(item.id);
                if (isMobile) onToggleSidebar();
              }}
              style={{
                padding: "12px 16px",
                marginBottom: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor:
                  activeMenu === item.id ? "#f5f5f5" : "transparent",
                borderLeft:
                  activeMenu === item.id
                    ? "4px solid #1a237e"
                    : "4px solid transparent",
                color: activeMenu === item.id ? "#1a237e" : "#666",
                fontWeight: activeMenu === item.id ? "600" : "400",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
