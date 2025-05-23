
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";

export function SecurityMonitor() {
  const securityEvents = [
    { id: 1, type: "login_attempt", severity: "high", ip: "192.168.1.1", timestamp: "2024-03-20 10:30" },
    { id: 2, type: "password_change", severity: "low", ip: "192.168.1.2", timestamp: "2024-03-20 11:15" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Мониторинг безопасности
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Тип события</TableHead>
              <TableHead>Важность</TableHead>
              <TableHead>IP адрес</TableHead>
              <TableHead>Время</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {securityEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.type}</TableCell>
                <TableCell>
                  <Badge variant={event.severity === "high" ? "destructive" : "default"}>
                    {event.severity}
                  </Badge>
                </TableCell>
                <TableCell>{event.ip}</TableCell>
                <TableCell>{event.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
