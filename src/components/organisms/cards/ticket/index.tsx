"use client";

import { BtnAction } from "@/components/atoms";
import type { ITicket } from "@/interfaces";

export const Ticket = ({
  receiptNumber,
  date,
  createdAt,
  paidAt,
  clientName,
  clientLocation,
  clientCuit,
  clientDni,
  items,
  total,
  onBack,
  isMobile = false,
}: ITicket) => {
  // Parsear fecha creada
  const fechaCreadaParts = (createdAt || date).split("/");
  const diaCreada = fechaCreadaParts[0] || "";
  const mesCreada = fechaCreadaParts[1] || "";
  const añoCreada = fechaCreadaParts[2] || "";

  // Parsear fecha pagada
  const fechaPagadaParts = (paidAt || date).split("/");
  const diaPagada = fechaPagadaParts[0] || "";
  const mesPagada = fechaPagadaParts[1] || "";
  const añoPagada = fechaPagadaParts[2] || "";

  // Calcular total sumando todos los importes
  const calcularTotal = () => {
    const suma = items.reduce((acc, item) => {
      // Remover puntos y convertir a número
      const importeNum =
        parseFloat(item.amount.replace(/\./g, "").replace(",", ".")) || 0;
      return acc + importeNum;
    }, 0);
    // Formatear con puntos como separadores de miles
    return suma.toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const totalCalculado = calcularTotal();

  return (
    <div style={{ padding: isMobile ? "16px" : "32px" }}>
      {/* Botón volver */}
      <div className="mb-3">
        <BtnAction variant="secondary" size="sm" onClick={onBack}>
          ← Volver
        </BtnAction>
      </div>

      {/* Contenedor de la boleta */}
      <div
        className="border rounded p-4"
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header: Nombre de empresa y número */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              creada por RAMIREZ ABRAHAM
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              Barrio San Ramón 3515 - Ciervo Petiso (Chaco)
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              Responsable Monotributo
            </div>
          </div>
          <div className="text-end">
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
              N° {receiptNumber.toString().padStart(4, "0")}
            </div>
          </div>
        </div>

        {/* Tipo de documento */}
        <div className="text-center mb-3">
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#333",
              margin: 0,
            }}
          >
            PRESUPUESTO
          </h3>
        </div>

        {/* Fechas: CREADA y PAGADA */}
        <div className="mb-3">
          <div className="d-flex justify-content-center align-items-start gap-5">
            {/* CREADA */}
            <div className="d-flex flex-column align-items-center">
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  color: "#999",
                }}
              >
                CREADA
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  DIA:
                </span>
                <div
                  className="border d-inline-block px-3 py-1"
                  style={{ minWidth: "50px", textAlign: "center" }}
                >
                  {diaCreada}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  MES:
                </span>
                <div
                  className="border d-inline-block px-3 py-1"
                  style={{ minWidth: "50px", textAlign: "center" }}
                >
                  {mesCreada}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  AÑO:
                </span>
                <div
                  className="border d-inline-block px-3 py-1"
                  style={{ minWidth: "50px", textAlign: "center" }}
                >
                  {añoCreada}
                </div>
              </div>
            </div>
            {/* PAGADA */}
            <div className="d-flex flex-column align-items-center">
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  color: "#999",
                }}
              >
                PAGADA
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  DIA:
                </span>
                <div
                  className="border d-inline-block px-3 py-1"
                  style={{ minWidth: "50px", textAlign: "center" }}
                >
                  {diaPagada}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  MES:
                </span>
                <div
                  className="border d-inline-block px-3 py-1"
                  style={{ minWidth: "50px", textAlign: "center" }}
                >
                  {mesPagada}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                  AÑO:
                </span>
                <div
                  className="border d-inline-block px-3 py-1"
                  style={{ minWidth: "50px", textAlign: "center" }}
                >
                  {añoPagada}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información del cliente */}
        <div className="mb-3">
          <div className="mb-2">
            <span style={{ fontSize: "14px", fontWeight: "600" }}>(a):</span>{" "}
            <span style={{ fontSize: "14px", textDecoration: "underline" }}>
              {clientName}
            </span>
          </div>
          <div className="mb-2 d-flex align-items-center gap-3">
            <div>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>CUIT:</span>{" "}
              <span style={{ fontSize: "14px" }}>
                {clientCuit || "________________"}
              </span>
            </div>
            <div>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#d32f2f" }}>DNI</span>{" "}
              <span style={{ fontSize: "14px" }}>
                {clientDni || "________________"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="mb-3">
          <table className="table table-bordered" style={{ fontSize: "14px" }}>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Cantidad</th>
                <th style={{ width: "40%" }}>DETALLE</th>
                <th style={{ width: "20%" }}>P. Unitario</th>
                <th style={{ width: "25%" }}>IMPORTE</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.quantity || ""}</td>
                  <td>{item.detail}</td>
                  <td className="text-end">{item.unitPrice || ""}</td>
                  <td className="text-end">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="d-flex justify-content-end align-items-center">
          <span
            style={{ fontSize: "16px", fontWeight: "700", marginRight: "12px" }}
          >
            TOTAL $
          </span>
          <div
            className="border d-inline-block px-3 py-1"
            style={{
              minWidth: "150px",
              textAlign: "right",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            {totalCalculado}
          </div>
        </div>
      </div>
    </div>
  );
};
