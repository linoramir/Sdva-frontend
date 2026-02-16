import { useState, useEffect } from "react";

export type Platform = "mobile" | "tablet" | "desktop";
export type DeviceType = "ios" | "android" | "windows" | "macos" | "linux" | "unknown";

export interface UsePlatformReturn {
  platform: Platform;
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  isTouchDevice: boolean;
}

/**
 * Hook para detectar la plataforma y características del dispositivo
 * 
 * @returns {UsePlatformReturn} Objeto con información sobre la plataforma actual
 * 
 * @example
 * ```tsx
 * const { isMobile, platform, screenWidth } = usePlatform();
 * 
 * if (isMobile) {
 *   return <MobileLayout />;
 * }
 * return <DesktopLayout />;
 * ```
 */
export const usePlatform = (): UsePlatformReturn => {
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown");
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const detectPlatform = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenWidth(width);
      setScreenHeight(height);

      // Detectar tipo de dispositivo
      const userAgent = navigator.userAgent.toLowerCase();
      let detectedDeviceType: DeviceType = "unknown";

      if (/iphone|ipad|ipod/.test(userAgent)) {
        detectedDeviceType = "ios";
      } else if (/android/.test(userAgent)) {
        detectedDeviceType = "android";
      } else if (/win/.test(userAgent)) {
        detectedDeviceType = "windows";
      } else if (/mac/.test(userAgent)) {
        detectedDeviceType = "macos";
      } else if (/linux/.test(userAgent)) {
        detectedDeviceType = "linux";
      }

      setDeviceType(detectedDeviceType);

      // Detectar si es dispositivo táctil
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );

      // Determinar plataforma basada en el ancho de pantalla
      if (width < 768) {
        setPlatform("mobile");
      } else if (width >= 768 && width < 1024) {
        setPlatform("tablet");
      } else {
        setPlatform("desktop");
      }
    };

    // Detectar inicialmente
    detectPlatform();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener("resize", detectPlatform);
    window.addEventListener("orientationchange", detectPlatform);

    return () => {
      window.removeEventListener("resize", detectPlatform);
      window.removeEventListener("orientationchange", detectPlatform);
    };
  }, []);

  return {
    platform,
    deviceType,
    isMobile: platform === "mobile",
    isTablet: platform === "tablet",
    isDesktop: platform === "desktop",
    screenWidth,
    screenHeight,
    isTouchDevice,
  };
};
