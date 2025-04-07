import { Area, AreaChart, XAxis, ResponsiveContainer } from "recharts"
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

// Move formatter outside component to avoid hook ordering issues
const formatTooltipValue = (value: unknown) => FormatMoney(Number(value))

interface SalesAreaChartProps {
  graph: GraphProps[];
}

export default function ChartComponent({ graph }: SalesAreaChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={graph}
          margin={{
            top: 10,
            right: 12,
            left: 12,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
            tickFormatter={(value) => value.slice(0, 5)}
            style={{ fontSize: '12px' }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent 
                indicator="line" 
                formatter={formatTooltipValue}
              />
            }
          />
          <Area
            dataKey="value"
            type="monotone"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="#4c1d95"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 1 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
