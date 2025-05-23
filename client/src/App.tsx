
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import AdminDashboardPage from "@/pages/admin/dashboard-page";
import AdminUsersPage from "@/pages/admin/users-page";
import AdminSettingsPage from "@/pages/admin/settings-page";
import AdminSecurityPage from "@/pages/admin/security-page";
import AdminSystemPage from "@/pages/admin/system-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />

      {/* Админ-панель */}
      <ProtectedRoute path="/admin" component={AdminDashboardPage} isAdmin />
      <ProtectedRoute path="/admin/users" component={AdminUsersPage} isAdmin />
      <ProtectedRoute path="/admin/settings" component={AdminSettingsPage} isAdmin />
      <ProtectedRoute path="/admin/security" component={AdminSecurityPage} isAdmin />
      <ProtectedRoute path="/admin/system" component={AdminSystemPage} isAdmin />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
