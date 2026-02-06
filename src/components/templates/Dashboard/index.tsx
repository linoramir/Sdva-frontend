"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BtnAction } from "@/components/atoms";
import { GrAddCircle } from "react-icons/gr";
import { CardUser, Detail, Header, Navbar, Ticket } from "@/components/organisms";
import type { DetailUser } from "@/components/organisms";

export const TempleDashboard = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("usuarios");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
const [isHovered, setIsHovered] = useState(false);

const [selectedUser, setSelectedUser] = useState<DetailUser | null>(null);
const [selectedBoleta, setSelectedBoleta] = useState<{
  id: string;
  fecha: string;
  numeroBoleta: number;
} | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Datos de ejemplo para las cards de usuarios
  const users = [
    {
      id: "1",
      nombre: "Lino ramirez",
      numeroBoleta: 7000,
      correo: "ramirezlinogabriel@gmail",
      telefono: "1164213553",
      fechaBoleta: "1/2/26",
      saldo: "$100.000",
    },
    {
      id: "2",
      nombre: "María García",
      numeroBoleta: 7001,
      correo: "maria.garcia@mail.com",
      telefono: "1155667788",
      fechaBoleta: "15/1/26",
      saldo: "$250.000",
    },
    {
      id: "3",
      nombre: "Carlos López",
      numeroBoleta: 7002,
      correo: "carlos.lopez@mail.com",
      telefono: "1199887766",
      fechaBoleta: "20/1/26",
      saldo: "$75.000",
    },
    {
      id: "4",
      nombre: "Ana Martínez",
      numeroBoleta: 7003,
      correo: "ana.martinez@mail.com",
      telefono: "1122334455",
      fechaBoleta: "5/2/26",
      saldo: "$180.000",
    },
    {
      id: "5",
      nombre: "Pedro Sánchez",
      numeroBoleta: 7004,
      correo: "pedro.sanchez@mail.com",
      telefono: "1144556677",
      fechaBoleta: "28/1/26",
      saldo: "$320.000",
    },
    {
      id: "6",
      nombre: "Laura Fernández",
      numeroBoleta: 7005,
      correo: "laura.fernandez@mail.com",
      telefono: "1133445566",
      fechaBoleta: "10/2/26",
      saldo: "$95.000",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        position: "relative",
        overflowX: "hidden",
        overflowY: isMobile && sidebarOpen ? "hidden" : "visible",
      }}
    >
      <Navbar
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(false)}
        onLogout={() => router.push("/")}
      />

      {/* Contenido principal: en móvil ocupa todo el ancho cuando sidebar está cerrado */}
      <main
        style={{
          marginLeft: isMobile ? "0" : "250px",
          flex: 1,
          minWidth: 0,
          maxWidth: isMobile ? "100vw" : "calc(100% - 250px)",
          backgroundColor: "#ffffff",
          width: isMobile ? "100%" : "calc(100% - 250px)",
          overflowX: "hidden",
        }}
      >
        <Header
          pageName={selectedUser ? selectedUser.nombre : "Gestión de usuarios"}
          user={{ name: "Niklas Schmidt", role: "Stylist Artist" }}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={() => console.log("Buscar", searchValue)}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          rightAction={
{!selectedUser && (
  <BtnAction
    variant="primary"
    className={`d-flex align-items-center justify-content-center gap-2 ${isMobile ? "w-100" : ""}`}
    style={{
      backgroundColor: isHovered ? "#E6175C" : "#ffffff",
      border: "2px solid #E6175C",
      borderRadius: "12px",
      color: isHovered ? "#ffffff" : "#E6175C",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <GrAddCircle
      size={20}
      color={isHovered ? "#ffffff" : "#E6175C"}
      style={{ transition: "color 0.3s ease" }}
    />
    <span>{isMobile ? "Agregar" : "Agregar usuario"}</span>
  </BtnAction>
)}

          }
        />

        {/* Contenido de la página */}
        {selectedBoleta && selectedUser ? (
          <Ticket
            numeroBoleta={selectedBoleta.numeroBoleta}
            fecha={selectedBoleta.fecha}
            clienteNombre={selectedUser.nombre}
            clienteLocalidad="Ciudad"
            clienteCuit=""
            items={[
              { cantidad: "1", detalle: "SALDO", importe: "25.000" },
              { cantidad: "1", detalle: "PAR MEDIA", importe: "1500" },
              { cantidad: "1", detalle: "ZAPATILLA COLEGIAL", importe: "3500" },
              { cantidad: "1", detalle: "REMERA BLANCO", importe: "61500" },
            ]}
            total={selectedUser.saldo}
            onBack={() => setSelectedBoleta(null)}
            isMobile={isMobile}
          />
        ) : selectedUser ? (
          <Detail
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
            onOpenTicket={(boleta) => setSelectedBoleta(boleta)}
            isMobile={isMobile}
          />
        ) : (
          <div style={{ padding: isMobile ? "16px" : "32px" }}>
            {/* Cards de usuarios - una columna, un usuario por fila */}
            <div className="row row-cols-1 g-4">
              {users.map((user) => (
                <div key={user.id} className="col-12">
                  <CardUser
                    id={user.id}
                    nombre={user.nombre}
                    numeroBoleta={user.numeroBoleta}
                    correo={user.correo}
                    telefono={user.telefono}
                    fechaBoleta={user.fechaBoleta}
                    saldo={user.saldo}
                    onOpen={() => setSelectedUser(user)}
                    onDelete={() => console.log("Eliminar usuario", user.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
