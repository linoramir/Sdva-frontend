"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header, Navbar } from "@/components/organisms";

export const TempleMetrics = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("metrics");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

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
          pageName="Métricas"
          user={{ name: "Niklas Schmidt", role: "Stylist Artist" }}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <div style={{ padding: isMobile ? "16px" : "32px" }}>
          <p>Aquí se verán "Métricas"</p>
        </div>
      </main>
    </div>
  );
};

