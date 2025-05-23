import { useAuth } from "@/hooks/use-auth";
import { Loader2, ShieldAlert } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
  isAdmin = false,
}: {
  path: string;
  component: () => React.JSX.Element;
  isAdmin?: boolean;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth?tab=login" />
      </Route>
    );
  }

  // Проверка на права администратора
  if (isAdmin && user.role !== 'admin') {
    return (
      <Route path={path}>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Доступ запрещен</h1>
          <p className="text-muted-foreground mb-6">
            У вас нет прав для доступа к этой странице. 
            Данный раздел доступен только администраторам.
          </p>
          <Redirect to="/" />
        </div>
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}
