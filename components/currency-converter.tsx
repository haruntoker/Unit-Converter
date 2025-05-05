"use client";

import { ConverterCard } from "@/components/converter-card";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Currency metadata: code, symbol, and name.
 * Extend as needed for more currencies.
 */
const CURRENCY_META = {
  EUR: { symbol: "€", name: "Euro" },
  TRY: { symbol: "₺", name: "Turkish Lira" },
  GBP: { symbol: "£", name: "British Pound" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
  USD: { symbol: "$", name: "US Dollar" },
  AUD: { symbol: "$", name: "Australian Dollar" },
  CAD: { symbol: "$", name: "Canadian Dollar" },
  CHF: { symbol: "Fr", name: "Swiss Franc" },
  CNY: { symbol: "¥", name: "Chinese Yuan" },
  INR: { symbol: "₹", name: "Indian Rupee" },
  RUB: { symbol: "₽", name: "Russian Ruble" },
  BRL: { symbol: "R$", name: "Brazilian Real" },
  ZAR: { symbol: "R", name: "South African Rand" },
  SEK: { symbol: "kr", name: "Swedish Krona" },
  NOK: { symbol: "kr", name: "Norwegian Krone" },
  SGD: { symbol: "$", name: "Singapore Dollar" },
  HKD: { symbol: "$", name: "Hong Kong Dollar" },
  MXN: { symbol: "$", name: "Mexican Peso" },
  KRW: { symbol: "₩", name: "South Korean Won" },
  NZD: { symbol: "$", name: "New Zealand Dollar" },
  PLN: { symbol: "zł", name: "Polish Zloty" },
  DKK: { symbol: "kr", name: "Danish Krone" },
  THB: { symbol: "฿", name: "Thai Baht" },
  IDR: { symbol: "Rp", name: "Indonesian Rupiah" },
  HUF: { symbol: "Ft", name: "Hungarian Forint" },
  CZK: { symbol: "Kč", name: "Czech Koruna" },
  ILS: { symbol: "₪", name: "Israeli New Shekel" },
  MYR: { symbol: "RM", name: "Malaysian Ringgit" },
  PHP: { symbol: "₱", name: "Philippine Peso" },
  AED: { symbol: ".د.إ", name: "UAE Dirham" },
  SAR: { symbol: "ر.س", name: "Saudi Riyal" },
  TWD: { symbol: "NT$", name: "New Taiwan Dollar" },
  ARS: { symbol: "$", name: "Argentine Peso" },
  CLP: { symbol: "$", name: "Chilean Peso" },
  COP: { symbol: "$", name: "Colombian Peso" },
  VND: { symbol: "₫", name: "Vietnamese Dong" },
  PKR: { symbol: "₨", name: "Pakistani Rupee" },
  EGP: { symbol: "£", name: "Egyptian Pound" },
  NGN: { symbol: "₦", name: "Nigerian Naira" },
  KES: { symbol: "KSh", name: "Kenyan Shilling" },
  GHS: { symbol: "₵", name: "Ghanaian Cedi" },
  UAH: { symbol: "₴", name: "Ukrainian Hryvnia" },
  QAR: { symbol: "ر.ق", name: "Qatari Riyal" },
  MAD: { symbol: "د.م.", name: "Moroccan Dirham" },
} as const;

const SUPPORTED_CURRENCIES = Object.keys(CURRENCY_META) as Array<
  keyof typeof CURRENCY_META
>;
export type CurrencyCode = keyof typeof CURRENCY_META;

/**
 * Provider abstraction for fetching rates.
 */
async function fetchRates(
  base: CurrencyCode,
  date?: string
): Promise<Record<CurrencyCode, number>> {
  const provider = process.env.NEXT_PUBLIC_CURRENCY_PROVIDER || "currencyapi";
  const symbols = SUPPORTED_CURRENCIES.join(",");
  if (provider === "currencyapi") {
    const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
    let url = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${base}&currencies=${symbols}`;
    if (date)
      url = `https://api.currencyapi.com/v3/historical?apikey=${API_KEY}&base_currency=${base}&currencies=${symbols}&date=${date}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.data) throw new Error("Invalid rates data");
    const rates: Record<CurrencyCode, number> = {} as any;
    for (const code of SUPPORTED_CURRENCIES) {
      rates[code] = data.data[code]?.value ?? 0;
    }
    return rates;
  } else if (provider === "exchangeratehost") {
    let url = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`;
    if (date)
      url = `https://api.exchangerate.host/${date}?base=${base}&symbols=${symbols}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.rates) throw new Error("Invalid rates data");
    return data.rates as Record<CurrencyCode, number>;
  }
  throw new Error("Unsupported provider");
}

/**
 * Currency converter with real-time rates and error/loading states.
 * Prepares for historical rates and chart integration.
 */
export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const {
    data: rates,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<Record<CurrencyCode, number>, Error>({
    queryKey: ["currency-rates", fromCurrency /*, date*/],
    queryFn: () => fetchRates(fromCurrency /*, date*/),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  let result = "-";
  if (rates && amount) {
    const converted = amount * rates[toCurrency];
    result = `${CURRENCY_META[toCurrency].symbol}${converted.toFixed(
      2
    )} ${toCurrency}`;
  } else if (amount) {
    result = `${CURRENCY_META[toCurrency].symbol}0.00 ${toCurrency}`;
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <ConverterCard
      title="Currency Converter"
      icon="💰"
      result={result}
      onSwap={handleSwap}
    >
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
            placeholder="Enter amount"
            min={0}
            step={0.01}
            inputMode="decimal"
            aria-label="Amount to convert"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fromCurrency">From</Label>
            <button
              type="button"
              className="w-full border rounded-md px-3 py-2 text-left bg-background"
              aria-label="Select from currency"
              onClick={() => setFromOpen(true)}
            >
              {fromCurrency
                ? `${CURRENCY_META[fromCurrency].symbol} ${fromCurrency}`
                : "Select currency"}
            </button>
            <CommandDialog open={fromOpen} onOpenChange={setFromOpen}>
              <DialogTitle>Select currency</DialogTitle>
              <CommandInput placeholder="Search currency..." />
              <CommandList>
                <CommandEmpty>No currency found.</CommandEmpty>
                {SUPPORTED_CURRENCIES.map((code) => (
                  <CommandItem
                    key={code}
                    value={code}
                    onSelect={() => {
                      setFromCurrency(code);
                      setFromOpen(false);
                    }}
                    className="cursor-pointer"
                    aria-selected={fromCurrency === code}
                  >
                    {CURRENCY_META[code].symbol} {code} –{" "}
                    {CURRENCY_META[code].name}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandDialog>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="toCurrency">To</Label>
            <button
              type="button"
              className="w-full border rounded-md px-3 py-2 text-left bg-background"
              aria-label="Select to currency"
              onClick={() => setToOpen(true)}
            >
              {toCurrency
                ? `${CURRENCY_META[toCurrency].symbol} ${toCurrency}`
                : "Select currency"}
            </button>
            <CommandDialog open={toOpen} onOpenChange={setToOpen}>
              <DialogTitle>Select currency</DialogTitle>
              <CommandInput placeholder="Search currency..." />
              <CommandList>
                <CommandEmpty>No currency found.</CommandEmpty>
                {SUPPORTED_CURRENCIES.map((code) => (
                  <CommandItem
                    key={code}
                    value={code}
                    onSelect={() => {
                      setToCurrency(code);
                      setToOpen(false);
                    }}
                    className="cursor-pointer"
                    aria-selected={toCurrency === code}
                  >
                    {CURRENCY_META[code].symbol} {code} –{" "}
                    {CURRENCY_META[code].name}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandDialog>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="text-xs text-muted-foreground">Loading rates…</div>
        ) : null}
        {isError ? (
          <div className="text-xs text-destructive">
            {error?.message || "Failed to load rates."}{" "}
            <button className="underline ml-2" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        ) : null}
      </div>
    </ConverterCard>
  );
}
