
import React from 'react';
import { Card } from "@/components/ui/card";
import TransactionHistory from "./TransactionHistory";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Панель управления</h2>
          <p className="text-muted-foreground mb-6">
            Добро пожаловать в личный кабинет инвестора. Здесь вы можете управлять своими инвестициями, пополнять счет и выводить средства.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <DepositForm />
            <WithdrawForm />
          </div>
        </Card>
        
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;
