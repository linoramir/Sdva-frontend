"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BtnAction } from "@/components/atoms";
import { GrAddCircle } from "react-icons/gr";
import { CardUser, Detail, Header, Navbar, Ticket } from "@/components/organisms";
import type { IUser } from "@/interfaces";

export const TempleDashboard = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("inicio");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
const [isHovered, setIsHovered] = useState(false);

const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
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

  const handleMenuChange = (id: string) => {
    setActiveMenu(id);
    switch (id) {
      case "inicio":
        router.push("/dashboard");
        break;
      case "management":
        router.push("/management");
        break;
      case "trade":
        router.push("/trade");
        break;
      case "metrics":
        router.push("/metrics");
        break;
      case "alerts":
        router.push("/alerts");
        break;
      default:
        break;
    }
  };

  // Datos de ejemplo para las cards de usuarios
  const users: IUser[] = [
    {
      id: "1",
      name: "Lino ramirez",
      receiptNumber: 7000,
      email: "ramirezlinogabriel@gmail",
      phone: "1164213553",
      receiptDate: "1/2/26",
      balance: "$100.000",
    },
    {
      id: "2",
      name: "María García",
      receiptNumber: 7001,
      email: "maria.garcia@mail.com",
      phone: "1155667788",
      receiptDate: "15/1/26",
      balance: "$250.000",
    },
    {
      id: "3",
      name: "Carlos López",
      receiptNumber: 7002,
      email: "carlos.lopez@mail.com",
      phone: "1199887766",
      receiptDate: "20/1/26",
      balance: "$75.000",
    },
    {
      id: "4",
      name: "Ana Martínez",
      receiptNumber: 7003,
      email: "ana.martinez@mail.com",
      phone: "1122334455",
      receiptDate: "5/2/26",
      balance: "$180.000",
    },
    {
      id: "5",
      name: "Pedro Sánchez",
      receiptNumber: 7004,
      email: "pedro.sanchez@mail.com",
      phone: "1144556677",
      receiptDate: "28/1/26",
      balance: "$320.000",
    },
    {
      id: "6",
      name: "Laura Fernández",
      receiptNumber: 7005,
      email: "laura.fernandez@mail.com",
      phone: "1133445566",
      receiptDate: "10/2/26",
      balance: "$95.000",
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
        onMenuChange={handleMenuChange}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(false)}
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
          pageName={selectedUser ? selectedUser.name : ""}
          user={{ name: "Niklas Schmidt", role: "Stylist Artist" }}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={() => console.log("Buscar", searchValue)}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          rightAction={null}
        />

        {/* Contenido de la página */}
        {selectedBoleta && selectedUser ? (
          <Ticket
            receiptNumber={selectedBoleta.numeroBoleta}
            date={selectedBoleta.fecha}
            clientName={selectedUser.name}
            clientLocation="Ciudad"
            clientCuit=""
            items={[
              { quantity: "1", detail: "SALDO", amount: "25.000" },
              { quantity: "1", detail: "PAR MEDIA", amount: "1500" },
              { quantity: "1", detail: "ZAPATILLA COLEGIAL", amount: "3500" },
              { quantity: "1", detail: "REMERA BLANCO", amount: "61500" },
            ]}
            total={selectedUser.balance}
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
            {/* Título izquierda + Agregar usuario derecha */}
            <div
              className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4"
              style={{ gap: "12px" }}
            >
              <h2 className="mb-0 fs-5 fw-semibold text-body">Gestión de usuarios</h2>
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
            </div>
            {/* Lista de usuarios */}
            <div className="row row-cols-1 g-4">
              {users.map((user) => (
                <div key={user.id} className="col-12">
                  <CardUser
                    user={user}
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
