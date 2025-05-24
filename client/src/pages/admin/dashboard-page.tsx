import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAnalytics from "@/components/admin/UserAnalytics";
import RequestsManagement from "@/components/admin/RequestsManagement";
import SystemHealth from "@/components/admin/SystemHealth";
import BackupManager from "@/components/admin/BackupManager";
import ReportGenerator from "@/components/admin/ReportGenerator";
import SecurityMonitor from "@/components/admin/SecurityMonitor";
import SystemNotifications from "@/components/admin/SystemNotifications";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserAnalytics />
          <RequestsManagement />
          <SystemHealth />
          <SecurityMonitor />
          <BackupManager />
          <ReportGenerator />
          <SystemNotifications />
        </div>
      </div>
    </AdminLayout>
  );
}