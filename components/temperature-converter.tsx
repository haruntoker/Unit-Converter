"use client";

import { ConverterCard } from "@/components/converter-card";
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

type TempUnit = "C" | "F" | "K";

export function TemperatureConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<TempUnit>("C");
  const [toUnit, setToUnit] = useState<TempUnit>("F");
  const [result, setResult] = useState<string>("32.00 °F");

  useEffect(() => {
    if (amount !== undefined) {
      let converted: number;

      // Convert to Celsius first
      let celsius: number;
      switch (fromUnit) {
        case "C":
          celsius = amount;
          break;
        case "F":
          celsius = ((amount - 32) * 5) / 9;
          break;
        case "K":
          celsius = amount - 273.15;
          break;
      }

      // Convert from Celsius to target unit
      switch (toUnit) {
        case "C":
          converted = celsius;
          break;
        case "F":
          converted = (celsius * 9) / 5 + 32;
          break;
        case "K":
          converted = celsius + 273.15;
          break;
      }

      setResult(`${converted.toFixed(2)} °${toUnit}`);
    } else {
      setResult(`0.00 °${toUnit}`);
    }
  }, [amount, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <ConverterCard
      title="Temperature Converter"
      icon="🌡️"
      result={result}
      onSwap={handleSwap}
    >
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="temperature">Temperature</Label>
          <Input
            id="temperature"
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
            placeholder="Enter temperature"
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
                <SelectItem value="C">Celsius (°C)</SelectItem>
                <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                <SelectItem value="K">Kelvin (K)</SelectItem>
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
                <SelectItem value="C">Celsius (°C)</SelectItem>
                <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                <SelectItem value="K">Kelvin (K)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </ConverterCard>
  );
}
