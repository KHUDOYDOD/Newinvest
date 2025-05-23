
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { date: '2024-01', activeUsers: 120, engagementRate: 75 },
  { date: '2024-02', activeUsers: 150, engagementRate: 80 },
  { date: '2024-03', activeUsers: 180, engagementRate: 85 },
];

export function UserBehaviorAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Пользовательская активность</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" name="Активные пользователи" />
            <Line type="monotone" dataKey="engagementRate" stroke="#82ca9d" name="Уровень вовлеченности %" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
