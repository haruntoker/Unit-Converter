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

// Conversion rates to grams
const weightRates = {
  g: 1,
  kg: 1000,
  lb: 453.592,
  oz: 28.3495,
};

export function WeightConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<keyof typeof weightRates>("kg");
  const [toUnit, setToUnit] = useState<keyof typeof weightRates>("lb");
  const [result, setResult] = useState<string>("2.20 lb");

  useEffect(() => {
    if (amount) {
      // Convert to base unit (grams) then to target unit
      const grams = amount * weightRates[fromUnit];
      const converted = grams / weightRates[toUnit];
      setResult(`${converted.toFixed(2)} ${toUnit}`);
    } else {
      setResult(`0.00 ${toUnit}`);
    }
  }, [amount, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <ConverterCard
      title="Weight Converter"
      icon="⚖️"
      result={result}
      onSwap={handleSwap}
    >
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
            placeholder="Enter weight"
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
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="g">Grams (g)</SelectItem>
                <SelectItem value="lb">Pounds (lb)</SelectItem>
                <SelectItem value="oz">Ounces (oz)</SelectItem>
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
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="g">Grams (g)</SelectItem>
                <SelectItem value="lb">Pounds (lb)</SelectItem>
                <SelectItem value="oz">Ounces (oz)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </ConverterCard>
  );
}
