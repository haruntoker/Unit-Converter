"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import type { ReactNode } from "react";

interface ConverterCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  result: string;
  onSwap: () => void;
}

export function ConverterCard({
  title,
  icon,
  children,
  result,
  onSwap,
}: ConverterCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onSwap} title="Swap Units">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {children}
         
          <div className="mt-4 p-4 rounded-lg bg-muted">
            
            <div className="text-sm text-muted-foreground">Result</div>
            <motion.div
              key={result}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              
              {result}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
