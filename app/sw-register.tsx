"use client";

import { useEffect } from "react";

/**
 * Registers the service worker for offline support.
 * Can be reused as a hook in other components.
 */
export function useServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any).workbox === undefined
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Optionally, send error to monitoring service
      });
    }
  }, []);
}

/**
 * Component to register the service worker on mount.
 * Returns null (no UI rendered).
 */
export function ServiceWorkerRegister() {
  useServiceWorkerRegister();
  return null;
}
