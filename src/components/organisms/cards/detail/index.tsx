"use client";

import { useState } from "react";
import { BtnAction } from "@/components/atoms";
import type { IUser } from "@/interfaces";

export interface DetailProps {
  user: IUser;
  onBack: () => void;
  onOpenTicket?: (boleta: { id: string; fecha: string; numeroBoleta: number }) => void;
  isMobile?: boolean;
}

export const Detail = ({ user, onBack, onOpenTicket, isMobile = false }: DetailProps) => {
  const [activeTab, setActiveTab] = useState("payments");

  // Datos de ejemplo de boletas
  const boletas = [
    { id: "1", fecha: "1/2/26", numeroBoleta: 7000 },
    { id: "2", fecha: "15/1/26", numeroBoleta: 7001 },
    { id: "3", fecha: "20/1/26", numeroBoleta: 7002 },
    { id: "4", fecha: "5/2/26", numeroBoleta: 7003 },
    { id: "5", fecha: "28/1/26", numeroBoleta: 7004 },
    { id: "6", fecha: "10/2/26", numeroBoleta: 7005 },
  ];

  return (
    <div style={{ padding: isMobile ? "16px" : "32px" }}>
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              style={{ textDecoration: "none", color: "#666" }}
            >
              Usuarios
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {user.name}
          </li>
        </ol>
      </nav>

      {/* Título y botones de acción */}
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <h1
          style={{
            fontSize: isMobile ? "24px" : "32px",
            fontWeight: "700",
            color: "#333",
            margin: 0,
          }}
        >
          {user.name}
        </h1>
        <div className="d-flex gap-2">
          <BtnAction variant="primary">Enviar factura</BtnAction>
          <BtnAction variant="secondary" className="px-3">
            ⋯
          </BtnAction>
        </div>
      </div>

      {/* Detalles del cliente */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
              margin: 0,
            }}
          >
            Detalles del cliente
          </h3>
          <span style={{ cursor: "pointer", fontSize: "16px" }}>✏️</span>
        </div>
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span>🕐</span>
              <span className="text-body-secondary small">Ultima paga</span>
            </div>
            <div>{user.receiptDate}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span>@</span>
              <span className="text-body-secondary small">
                Nº de boleta actual
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>{user.receiptNumber}</span>
              <span style={{ cursor: "pointer", fontSize: "12px" }}>📋</span>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span>👥</span>
              <span className="text-body-secondary small">Clasificacion</span>
            </div>
            <div>Individual</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span>📧</span>
              <span className="text-body-secondary small">Correo</span>
            </div>
            <div>{user.email}</div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span>📱</span>
              <span className="text-body-secondary small">Teléfono</span>
            </div>
            <div>{user.phone}</div>
          </div>
        </div>
      </div>

      {/* Dirección */}
      <div className="mb-4">
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "16px",
          }}
        >
          Dirección
        </h3>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="text-body-secondary small mb-1">
              DIRECCIÓN DE FACTURACIÓN
            </div>
            <div>Dirección de ejemplo, Ciudad, País</div>
          </div>
          <div className="col-12 col-md-6">
            <div className="text-body-secondary small mb-1">
              DETALLES DE ENVÍO
            </div>
            <div>Dirección de ejemplo, Ciudad, País</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-3">
        <ul className="nav nav-tabs border-0">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "payments" ? "active" : ""}`}
              onClick={() => setActiveTab("payments")}
              style={{
                border: "none",
                borderBottom:
                  activeTab === "payments"
                    ? "2px solid #1a237e"
                    : "2px solid transparent",
                color: activeTab === "payments" ? "#1a237e" : "#666",
                fontWeight: activeTab === "payments" ? "600" : "400",
                padding: "12px 24px",
                background: "none",
                cursor: "pointer",
              }}
            >
              Historial de pagos
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "invoices" ? "active" : ""}`}
              onClick={() => setActiveTab("invoices")}
              style={{
                border: "none",
                borderBottom:
                  activeTab === "invoices"
                    ? "2px solid #1a237e"
                    : "2px solid transparent",
                color: activeTab === "invoices" ? "#1a237e" : "#666",
                fontWeight: activeTab === "invoices" ? "600" : "400",
                padding: "12px 24px",
                background: "none",
                cursor: "pointer",
              }}
            >
              Boletas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
              style={{
                border: "none",
                borderBottom:
                  activeTab === "account"
                    ? "2px solid #1a237e"
                    : "2px solid transparent",
                color: activeTab === "account" ? "#1a237e" : "#666",
                fontWeight: activeTab === "account" ? "600" : "400",
                padding: "12px 24px",
                background: "none",
                cursor: "pointer",
              }}
            >
              Cuenta
            </button>
          </li>
        </ul>
      </div>

      {/* Contenido de tabs */}
      {activeTab === "payments" && (
        <div>
          {/* Resumen */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="p-3 border rounded">
                <div className="text-body-secondary small mb-1">
                  TOTAL DE PAGOS
                </div>
                <div
                  style={{ fontSize: "24px", fontWeight: "700", color: "#333" }}
                >
                  12
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="p-3 border rounded">
                <div className="text-body-secondary small mb-1">
                  MONTO TOTAL PAGADO
                </div>
                <div
                  style={{ fontSize: "24px", fontWeight: "700", color: "#333" }}
                >
                  {user.balance}
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de pagos */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Método de pago</th>
                  <th>Pagado a</th>
                  <th className="text-end">Monto</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td>{user.receiptDate}, 10:55AM</td>
                    <td>
                      <span className="badge bg-light text-dark">
                        Transferencia
                      </span>
                    </td>
                    <td>Cuenta principal</td>
                    <td
                      className="text-end"
                      style={{ color: "#2e7d32", fontWeight: "600" }}
                    >
                      {user.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-body-secondary small">
              Mostrando 1-5 de 12 resultados
            </div>
            <div className="d-flex gap-2">
              <BtnAction variant="secondary" size="sm">
                ← Anterior
              </BtnAction>
              <BtnAction variant="secondary" size="sm">
                Siguiente →
              </BtnAction>
            </div>
          </div>
        </div>
      )}

      {activeTab === "invoices" && (
        <div>
          {/* Cards de boletas - rectangulares alargadas */}
          <div className="d-flex flex-column gap-3">
            {boletas.map((boleta) => (
              <div
                key={boleta.id}
                className="d-flex justify-content-between align-items-center p-3 border rounded"
                style={{
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => onOpenTicket?.(boleta)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
              >
                {/* Fecha pegada a la izquierda */}
                <div style={{ fontWeight: "500", color: "#333" }}>
                  {boleta.fecha}
                </div>
                {/* Número de boleta pegado a la derecha */}
                <div>
                  <span className="badge bg-primary">Boleta #{boleta.numeroBoleta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "account" && (
        <div className="text-center py-5 text-body-secondary">
          <p>Información de cuenta no disponible</p>
        </div>
      )}
    </div>
  );
};
