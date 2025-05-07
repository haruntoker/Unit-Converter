"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useIsMobile } from "@/components/ui/use-mobile";
import { useConverterTab } from "./converter";

export function BottomNav() {
  const isMobile = useIsMobile();
  const { tab, setTab } = useConverterTab();
  if (!isMobile) return null;
  return (
    <nav
      className="fixed bottom-6 left-0 w-full z-40 bg-background/95 backdrop-blur-lg border  flex items-center justify-around py-3 px-2 shadow-2xl rounded-2xl"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <button
        aria-label="Currency Converter"
        className={`flex flex-col items-center gap-1 text-xs focus:text-primary ${
          tab === "currency" ? "text-primary" : "text-muted-foreground"
        }`}
        onClick={() => setTab("currency")}
        tabIndex={0}
      >
        <span className="text-lg">💰</span> Currency
      </button>
      <button
        aria-label="Distance Converter"
        className={`flex flex-col items-center gap-1 text-xs focus:text-primary ${
          tab === "distance" ? "text-primary" : "text-muted-foreground"
        }`}
        onClick={() => setTab("distance")}
        tabIndex={0}
      >
        <span className="text-lg">📏</span> Distance
      </button>

      <button
        aria-label="Weight Converter"
        className={`flex flex-col items-center gap-1 text-xs focus:text-primary ${
          tab === "weight" ? "text-primary" : "text-muted-foreground"
        }`}
        onClick={() => setTab("weight")}
        tabIndex={0}
      >
        <span className="text-lg">⚖️</span> Weight
      </button>
      <button
        aria-label="Temperature Converter"
        className={`flex flex-col items-center gap-1 text-xs focus:text-primary ${
          tab === "temperature" ? "text-primary" : "text-muted-foreground"
        }`}
        onClick={() => setTab("temperature")}
        tabIndex={0}
      >
        <span className="text-lg">🌡️</span> Temp
      </button>
      <div className="ml-2">
        <ModeToggle />
      </div>
    </nav>
  );
}
