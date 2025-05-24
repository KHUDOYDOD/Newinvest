import React from 'react';
import { Card } from "@/components/ui/card";
import { InvestmentPerformance } from "./InvestmentPerformance";
import { ActiveDeposits } from "./ActiveDeposits";
import { TransactionHistory } from "./TransactionHistory";
import { Analytics } from "./Analytics";

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <InvestmentPerformance />
      <ActiveDeposits />
      <TransactionHistory />
      <Analytics />
    </div>
  );
}