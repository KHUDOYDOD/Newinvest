
import React from 'react';
import { Card } from "@/components/ui/card";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import TransactionHistory from "./TransactionHistory";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Депозиты и выводы</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <DepositForm />
            <WithdrawForm />
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">История транзакций</h2>
          <TransactionHistory />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
