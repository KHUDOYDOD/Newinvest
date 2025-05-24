import { useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import DepositForm from "@/components/dashboard/DepositForm";
import WithdrawForm from "@/components/dashboard/WithdrawForm";
import TransactionHistory from "@/components/dashboard/TransactionHistory";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Dashboard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <DepositForm />
          <WithdrawForm />
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
}