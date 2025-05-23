import { AdminLayout } from "@/components/admin/AdminLayout";
import SystemHealth from "@/components/admin/SystemHealth";

export default function SystemPage() {
  return (
    <AdminLayout>
      <SystemHealth />
    </AdminLayout>
  );
}