"use client";

import { useState } from "react";
import { FaTrash, IoOpen } from "@/components/atoms/icons";
import type { IUser } from "@/interfaces";

export interface CardUserProps {
  user: IUser;
  onOpen?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const CardUser = ({
  user,
  onOpen,
  onDelete,
  className = "",
}: CardUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const showActions = onOpen ?? onDelete;

  return (
    <div className={`accordion accordion-flush ${className}`}>
      <div
        className="accordion-item"
        style={{
          border: "1px solid #000",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={`card-user-body-${user.id}`}
          >
            <span className="d-flex w-100 justify-content-between align-items-center me-2">
              <span>{user.name}</span>
              <span className="badge bg-primary ms-2">
                Boleta #{user.receiptNumber}
              </span>
            </span>
          </button>
        </h2>
        <div
          id={`card-user-body-${user.id}`}
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          style={
            isOpen
              ? {
                  height: "auto",
                  overflow: "visible",
                  visibility: "visible",
                }
              : undefined
          }
        >
          <div className="accordion-body">
            <div className="row g-2">
              <div className="col-3">
                <span className="text-body-secondary small d-block">Correo</span>
                <span className="text-break">{user.email}</span>
              </div>
              <div className="col-3">
                <span className="text-body-secondary small d-block">Teléfono</span>
                <span className="text-break">{user.phone}</span>
              </div>
              <div className="col-3">
                <span className="text-body-secondary small d-block">
                  Fecha de boleta
                </span>
                <span className="text-break">{user.receiptDate}</span>
              </div>
              <div className="col-3 text-end">
                <span className="text-body-secondary small d-block">Saldo</span>
                <span className="badge bg-success">{user.balance}</span>
              </div>
            </div>
            {showActions && (
              <div className="mt-2 pt-2 border-top">
                {onOpen && (
                  <button
                    type="button"
                    onClick={onOpen}
                    aria-label="Abrir"
                    className="btn btn-link btn-sm p-0 me-2 text-decoration-none d-inline-flex align-items-center gap-1"
                  >
                    <IoOpen />
                    Abrir
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={onDelete}
                    aria-label="Eliminar"
                    className="btn btn-link btn-sm p-0 text-danger text-decoration-none d-inline-flex align-items-center gap-1"
                  >
                    <FaTrash />
                    Eliminar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
