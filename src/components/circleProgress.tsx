
type ProgressCircleProps = {
  percent: number;
};

const ProgressCircle = ({ percent }: ProgressCircleProps) => {
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  // Lógica de cor baseada na percentagem
  const getColor = (percent: number) => {
    if (percent < 50) return '#FF4D4F'; // Vermelho para percentagens abaixo de 50%
    if (percent < 75) return '#FFC107'; // Amarelo para percentagens entre 50% e 74%
    return '#4CAF50'; // Verde para percentagens acima de 75%
  };

  const color = getColor(percent);

  return (
    <div className="flex items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0" // Cor de fundo (cinza claro)
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <span className="absolute text-4xl font-semibold" style={{ color }}>
        {`${percent}%`}
      </span>
    </div>
  );
};

export default ProgressCircle;
