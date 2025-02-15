
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";




const colors = [
  "#E57373", // Vermelho suave
  "#81C784", // Verde suave
  "#64B5F6", // Azul claro
  "#FFD54F", // Amarelo suave
  "#BA68C8"  // Roxo pastel
];


interface CustomPieChartProps {
  data: { name: string; totalSells: number; totalAmount: number }[];
  totalSellsActive?: boolean,
}

export function CustomPieChart({ data, totalSellsActive = false }: CustomPieChartProps) {

  const totalSells = data.reduce((sum, item) => sum + item.totalSells, 0);

  const dataWithColors = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
    percentage: totalSells > 0 ? ((item.totalSells / totalSells) * 100).toFixed(2) : 0,
  }));

  

  return (
    <div className="my-auto flex items-center justify-center">
    <div 
      data-chart="chart-r47"
      className="flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none aspect-square max-h-[110px] w-[135px]"
    >
      <ResponsiveContainer>
      <PieChart width={215} height={190}>
        <Pie
          data={dataWithColors}
          dataKey="totalSells"
          nameKey="name"
          innerRadius={38}
          outerRadius={55}
          strokeWidth={1}
          animationBegin={0}
          animationDuration={1000} // Define a duração da animação em milissegundos
          isAnimationActive={true} // Ativa animação
        >
          {dataWithColors.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { totalSells, totalAmount } = payload[0].payload;
              return (
                <div className="bg-muted" style={{ padding: '10px', borderRadius: '5px', color: '#fff' }}>
                  <p>Vendas: <span className="font-semibold">{totalSells}</span></p>
                  <p>Total: <span className="font-semibold">{totalAmount}</span>€</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-3">
      {dataWithColors.map((entry) => (
        <div className="flex items-center gap-1.5 text-[12px]">
          <div className={`h-2 w-2 shrink-0 rounded-full mt-0.5`} style={{background: entry.fill}}></div>
            <span className="text-base">{entry.name}</span>
            <span className="text-base font-semibold">{totalSellsActive ? entry.totalSells : entry.totalAmount + "€"}</span>
        </div>
      ))}
    </div>
    </div>
  );
}
