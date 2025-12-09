import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  weather: {
    label: "Weather",
    color: "var(--chart-1)",
  },
};

export default function WeatherTempChart({ data }) {
  const today = new Date().toISOString().split("T")[0];

  const chartData = data.hourly.time
    .map((t, i) => {
      const d = new Date(t);

      return {
        raw: t,
        time: d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: data.hourly.temperature_2m[i],
      };
    })
    .filter((d) => d.raw.startsWith(today));

  return (
    <Card className={"bg-white/5 backdrop-blur-2xl"}>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} horizontal={false} />
            <XAxis
              dataKey="time"
              interval={3}
              tickLine={true}
              axisLine={true}
              tickMargin={4}
              stroke="var(--color-weather)"
            />
            <YAxis
              dataKey="temp"
              width={12}
              tickLine={true}
              axisLine={true}
              tickMargin={4}
              stroke="var(--color-weather)"
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line dataKey="temp" type="natural" stroke="var(--color-weather)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
