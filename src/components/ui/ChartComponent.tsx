import { Area, AreaChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"
import { Coins } from "lucide-react"
import type { GraphProps } from "../../features/home/api/req/req"
import { FormatMoney } from "../../utils/fomat"


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
              interval="preserveStartEnd" // Força o primeiro valor a ser mostrado
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                indicator="line" 
                formatter={(value: unknown) =>
                  FormatMoney(Number(value))
                }
                />}
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
