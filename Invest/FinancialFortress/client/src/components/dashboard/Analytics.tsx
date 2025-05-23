import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "01/05", profit: 120 },
  { date: "02/05", profit: 180 },
  { date: "03/05", profit: 150 },
  { date: "04/05", profit: 220 },
  { date: "05/05", profit: 280 },
  { date: "06/05", profit: 250 },
  { date: "07/05", profit: 300 },
];

export default function Analytics() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Аналитика доходности</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}