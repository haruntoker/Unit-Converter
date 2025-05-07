"use client";
import { CurrencyConverter } from "@/components/currency-converter";
import { DistanceConverter } from "@/components/distance-converter";
import { Footer } from "@/components/footer";
import { InstallPWA } from "@/components/install-pwa";
import { OfflineAlert } from "@/components/offline-alert";
import { TemperatureConverter } from "@/components/temperature-converter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeightConverter } from "@/components/weight-converter";
import { createContext, useContext, useState } from "react";

// Context for controlling the active converter tab
interface ConverterTabContextType {
  tab: string;
  setTab: (tab: string) => void;
}
const ConverterTabContext = createContext<ConverterTabContextType | undefined>(
  undefined
);

export function useConverterTab() {
  const ctx = useContext(ConverterTabContext);
  if (!ctx)
    throw new Error("useConverterTab must be used within ConverterTabProvider");
  return ctx;
}

export function ConverterTabProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<string>("distance");
  return (
    <ConverterTabContext.Provider value={{ tab, setTab }}>
      {children}
    </ConverterTabContext.Provider>
  );
}

export function Converter() {
  const { tab, setTab } = useConverterTab();
  return (
    <div className="w-full max-w-md mx-auto p-4 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Unit & Currency Converter</h1>
        <div className="flex items-center gap-2">
          <InstallPWA />
        </div>
      </div>
      <OfflineAlert />
      <div className="flex-1">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsContent value="currency">
            <CurrencyConverter />
          </TabsContent>
          <TabsContent value="distance">
            <DistanceConverter />
          </TabsContent>
          <TabsContent value="weight">
            <WeightConverter />
          </TabsContent>
          <TabsContent value="temperature">
            <TemperatureConverter />
          </TabsContent>
          <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
            <TabsList className="w-full h-16 grid grid-cols-4">
              <TabsTrigger
                value="currency"
                className="flex flex-col items-center justify-center data-[state=active]:bg-muted"
              >
                <span className="text-xl">💰</span>
                <span className="text-xs">Currency</span>
              </TabsTrigger>
              <TabsTrigger
                value="distance"
                className="flex flex-col items-center justify-center data-[state=active]:bg-muted"
              >
                <span className="text-xl">📏</span>
                <span className="text-xs">Distance</span>
              </TabsTrigger>
              <TabsTrigger
                value="weight"
                className="flex flex-col items-center justify-center data-[state=active]:bg-muted"
              >
                <span className="text-xl">⚖️</span>
                <span className="text-xs">Weight</span>
              </TabsTrigger>
              <TabsTrigger
                value="temperature"
                className="flex flex-col items-center justify-center data-[state=active]:bg-muted"
              >
                <span className="text-xl">🌡️</span>
                <span className="text-xs">Temperature</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
      <div className="h-16"></div> {/* Spacer for bottom navigation */}
      <Footer />
    </div>
  );
}
