
import React from 'react';
import { Card } from "@/components/ui/card";
import TransactionHistory from "./TransactionHistory";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Панель управления</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DepositForm />
            <WithdrawForm />
          </div>
        </Card>
        <TransactionHistory />
      </div>
    </div>
  );
}
