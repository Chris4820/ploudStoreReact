type GameCardComponentProps = {
  game: string;
  selectedOption: string;
  onChange: (option: string) => void;
  iconPath: string;
  disabled?: boolean;
};

export default function GameCardComponent({
  game,
  selectedOption,
  onChange,
  iconPath,
  disabled = false,
}: GameCardComponentProps) {
  const isSelected = selectedOption === game.toUpperCase();

  return (
    <div 
      className={`relative h-40 max-w-[300px] min-w-[270px] rounded-xl overflow-hidden bg-gray-200 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer group"
      } ${isSelected && 'ring ring-violet-600/80'}`}
      onClick={!disabled ? () => onChange(game.toUpperCase()) : undefined}
    >
      <input
        disabled={disabled}
        type="radio"
        name="radio"
        value={game}
        checked={isSelected}
        className="hidden"
      />
      <div className="relative w-full h-full">
        <img className="w-full h-full object-cover" src={iconPath} alt={game} />
        {disabled ? (
          // Overlay fixo quando disabled
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Em breve...</span>
          </div>
        ) : (
          // Overlay de hover somente se não estiver disabled
          <div className="absolute hidden group-hover:flex inset-0 bg-black bg-opacity-70 transition-opacity duration-300"></div>
        )}
      </div>
      {/* Mostra o nome do jogo em hover somente se não estiver disabled */}
      {!disabled && (
        <p className="absolute inset-0 hidden group-hover:flex items-center justify-center w-full text-sm font-medium text-white">
          {game}
        </p>
      )}
    </div>
  );
}
