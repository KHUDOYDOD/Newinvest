
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Server, Database, Network } from "lucide-react";

export default function SystemHealth() {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(60);
  const [diskUsage, setDiskUsage] = useState(32);
  const [networkUsage, setNetworkUsage] = useState(25);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Server className="h-5 w-5 text-blue-500" />
            CPU
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2 text-blue-500">{cpuUsage}%</div>
          <Progress value={cpuUsage} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Database className="h-5 w-5 text-green-500" />
            Память
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2 text-green-500">{memoryUsage}%</div>
          <Progress value={memoryUsage} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Database className="h-5 w-5 text-orange-500" />
            Диск
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2 text-orange-500">{diskUsage}%</div>
          <Progress value={diskUsage} className="h-2 bg-orange-100" indicatorClassName="bg-orange-500" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Network className="h-5 w-5 text-purple-500" />
            Сеть
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2 text-purple-500">{networkUsage}%</div>
          <Progress value={networkUsage} className="h-2 bg-purple-100" indicatorClassName="bg-purple-500" />
        </CardContent>
      </Card>
    </div>
  );
}
