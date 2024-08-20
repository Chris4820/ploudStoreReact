import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, TooltipProps } from 'recharts';
import {subDays, endOfWeek, format} from 'date-fns'

const today = new Date();
const lastDayOfWeek = endOfWeek(today);

const generateWeekDays = (endDate: Date): { name: string, vendas: number }[] => {
  const weekDays = [];
  let currentDate = endDate;

  for (let i = 0; i < 7; i++) {
    const formattedDate = format(currentDate, 'EEEE');
    // Gere um número aleatório entre 20 e 100 para as vendas fictícias
    const vendas = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
    weekDays.push({ name: formattedDate, vendas: vendas });
    currentDate = subDays(currentDate, 1); // Subtrai um dia para obter o próximo dia da semana
  }

  return weekDays.reverse(); // Inverte a ordem para começar no sábado e terminar na sexta-feira
};

const data = generateWeekDays(lastDayOfWeek);

interface CustomTooltipProps extends TooltipProps<any, any> {
  totalEuro: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, totalEuro }) => {
  if (active && payload && payload.length) {
    const venda = payload[0].value;
    return (
      <div className="bg-card-foreground text-primary-foreground p-2 rounded-lg">
        <p className="font-bold">{`${label}`}</p>
        <p className="value"><span className='font-semibold'>Vendas: </span>{`${venda}`}</p>
        <p className="value"><span className='font-semibold'>Lucro: </span>{`${(venda * totalEuro).toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const SalesAreaChart: React.FC = () => {
  const totalEuroMultiplier = 1.2; // Supondo que cada venda seja de 1,20€
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#8e44ad" stopOpacity={1} />
            <stop offset="90%" stopColor="#8e44ad" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="vendas" stroke="#8e44ad" fill="url(#colorGradient)" />
        <XAxis dataKey="name" interval="preserveStartEnd" />
        <Tooltip content={<CustomTooltip totalEuro={totalEuroMultiplier} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesAreaChart;
