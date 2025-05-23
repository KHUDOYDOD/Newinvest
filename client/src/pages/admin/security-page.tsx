import { AdminLayout } from "@/components/admin/AdminLayout";
import SecurityMonitor from "@/components/admin/SecurityMonitor";

export default function SecurityPage() {
  return (
    <AdminLayout>
      <SecurityMonitor />
    </AdminLayout>
  );
}