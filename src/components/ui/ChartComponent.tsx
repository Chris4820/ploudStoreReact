import { Area, AreaChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"
import { Coins } from "lucide-react"
import type { GraphProps } from "../../features/home/api/req/req"


const chartConfig = {
  desktop: {
    label: "Vendas",
    color: "#7c3aed",
    icon: Coins,
  },
} satisfies ChartConfig

interface SalesAreaChartProps {
  graph: GraphProps[];
}

export default function ChartComponent({graph} : SalesAreaChartProps) {
  return (
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={graph}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="monotone"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="#4c1d95" // Aqui você define um roxo mais escuro para a linha
              strokeWidth={2} 
            />
          </AreaChart>
        </ChartContainer>
  )
}
