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
import UsersPage from "@/pages/admin/users-page";
import AdminSettingsPage from "@/pages/admin/settings-page";
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
      <ProtectedRoute path="/admin/users" component={UsersPage} isAdmin />
      <ProtectedRoute path="/admin/settings" component={AdminSettingsPage} isAdmin />
      <ProtectedRoute path="/admin/deposits" component={AdminDashboardPage} isAdmin />
      <ProtectedRoute path="/admin/transactions" component={AdminDashboardPage} isAdmin />
      <ProtectedRoute path="/admin/support" component={AdminDashboardPage} isAdmin />
      
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
