"use client";

import { ConverterCard } from "@/components/converter-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

// Conversion rates to meters
const distanceRates = {
  m: 1,
  km: 1000,
  mi: 1609.34,
  ft: 0.3048,
};

export function DistanceConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<keyof typeof distanceRates>("mi");
  const [toUnit, setToUnit] = useState<keyof typeof distanceRates>("km");
  const [result, setResult] = useState<string>("1.61 km");

  useEffect(() => {
    if (amount) {
      // Convert to base unit (meters) then to target unit
      const meters = amount * distanceRates[fromUnit];
      const converted = meters / distanceRates[toUnit];
      setResult(`${converted.toFixed(2)} ${toUnit}`);
    } else {
      setResult(`0.00 ${toUnit}`);
    }
  }, [amount, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const isMilesToKm = fromUnit === "mi" && toUnit === "km";
  const isKmToMiles = fromUnit === "km" && toUnit === "mi";

  return (
    <ConverterCard
      title="Distance Converter"
      icon="📏"
      result={result}
      onSwap={handleSwap}
    >
      <div className="space-y-4">
        {(isMilesToKm || isKmToMiles) && (
          <Badge variant="outline" className="mb-2 bg-primary/10">
            {isMilesToKm ? "Miles to Kilometers" : "Kilometers to Miles"}
          </Badge>
        )}

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="distance">Distance</Label>
          <Input
            id="distance"
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
            placeholder="Enter distance"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fromUnit">From</Label>
            <Select
              value={fromUnit}
              onValueChange={(value: any) => setFromUnit(value)}
            >
              <SelectTrigger id="fromUnit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mi">Miles (mi)</SelectItem>
                <SelectItem value="km">Kilometers (km)</SelectItem>
                <SelectItem value="m">Meters (m)</SelectItem>
                <SelectItem value="ft">Feet (ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="toUnit">To</Label>
            <Select
              value={toUnit}
              onValueChange={(value: any) => setToUnit(value)}
            >
              <SelectTrigger id="toUnit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mi">Miles (mi)</SelectItem>
                <SelectItem value="km">Kilometers (km)</SelectItem>
                <SelectItem value="m">Meters (m)</SelectItem>
                <SelectItem value="ft">Feet (ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </ConverterCard>
  );
}
