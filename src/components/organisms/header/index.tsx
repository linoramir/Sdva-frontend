"use client";

import { useState, useEffect, useRef } from "react";
import { ImSearch } from "@/components/atoms/icons";
import { BtnAction } from "@/components/atoms";

export interface HeaderUser {
  name: string;
  role: string;
}

export interface HeaderProps {
  /** Nombre de la página (ej. "Gestión de usuarios") */
  pageName: string;
  /** Datos del usuario (nombre y rol) */
  user: HeaderUser;
  /** Valor del input de búsqueda (controlado) */
  searchValue?: string;
  /** Cambio en el input de búsqueda */
  onSearchChange?: (value: string) => void;
  /** Al enviar búsqueda (Enter o clic en Buscar) */
  onSearch?: () => void;
  /** Si es vista móvil */
  isMobile?: boolean;
  /** Si el sidebar está abierto (para mostrar hamburger) */
  sidebarOpen?: boolean;
  /** Alternar sidebar (móvil) */
  onToggleSidebar?: () => void;
  /** Acción derecha (ej. botón "Agregar usuario"). Se muestra a la derecha de la searchbar */
  rightAction?: React.ReactNode;
}

export const Header = ({
  pageName,
  user,
  searchValue = "",
  onSearchChange,
  onSearch,
  isMobile = false,
  sidebarOpen = false,
  onToggleSidebar,
  rightAction,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuOptions = [
    { id: "cuenta", label: "Cuenta" },
    { id: "configuracion", label: "Configuración" },
    { id: "historial", label: "Historial" },
    { id: "tema", label: "Tema" },
    { id: "salir", label: "Salir" },
  ];

  return (
    <header
      style={{
        padding: isMobile ? "12px 16px" : "16px 32px",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Barra superior: Logo, nav links, usuario */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: isMobile ? "16px" : "24px",
        }}
      >
        {/* Logo + hamburger (móvil) */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isMobile && onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                padding: "4px",
              }}
              aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
          )}
          <div
            style={{
              fontSize: isMobile ? "18px" : "20px",
              fontWeight: "600",
              color: "#1a237e",
            }}
          >
            <span style={{ fontSize: isMobile ? "20px" : "24px", marginRight: "6px" }}>W</span>
            WORKLA
          </div>
        </div>

        {/* Links centrales - oculto en móvil */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "24px" }}>
            {[1, 2, 3, 4].map((i) => (
              <a
                key={i}
                href="#"
                style={{ color: "#999", textDecoration: "none", fontSize: "14px" }}
              >
                Lorem
              </a>
            ))}
          </div>
        )}

        {/* Usuario: campana, avatar, nombre, rol, dropdown */}
        <div ref={menuRef} style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px",
              cursor: "pointer",
            }}
            onClick={toggleMenu}
          >
            {!isMobile && (
              <span style={{ fontSize: "20px", cursor: "pointer" }} aria-hidden>
                🔔
              </span>
            )}
            <div
              style={{
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                borderRadius: "50%",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "16px" : "18px",
              }}
            >
              👤
            </div>
            {!isMobile && (
              <>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#999" }}>{user.role}</div>
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    cursor: "pointer",
                    transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                  aria-hidden
                >
                  ▼
                </span>
              </>
            )}
          </div>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "180px",
                zIndex: 1000,
                overflow: "hidden",
              }}
            >
              {menuOptions.map((option) => (
                <div
                  key={option.id}
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "#333",
                    cursor: "default",
                    borderBottom:
                      option.id !== menuOptions[menuOptions.length - 1].id
                        ? "1px solid #f0f0f0"
                        : "none",
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nombre de la página */}
      <h1
        style={{
          fontSize: isMobile ? "22px" : "28px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "24px",
        }}
      >
        {pageName}
      </h1>

      {/* Searchbar + acción derecha */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            flex: 1,
            maxWidth: isMobile ? "100%" : "500px",
          }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              placeholder="Buscar"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ImSearch size={18} />
            </span>
          </div>
          {!isMobile && (
            <BtnAction
              variant="primary"
              style={{ whiteSpace: "nowrap" }}
              onClick={onSearch}
            >
              Buscar
            </BtnAction>
          )}
        </div>
        {rightAction}
      </div>
    </header>
  );
};
