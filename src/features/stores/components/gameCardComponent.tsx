
type GameCardComponentProps = {
  game: string;
  selectedOption: string;
  onChange: (option: string) => void;
  iconPath: string,
};

export default function GameCardComponent ({ game, selectedOption, onChange, iconPath }: GameCardComponentProps) {
  const isSelected = selectedOption === game.toUpperCase();

  return (
    <div 
      className={`cursor-pointer bg-gray-200 overflow-hidden focus:outline-none relative group h-40 max-w-[300px] min-w-[270px] rounded-xl ${
        isSelected && 'ring ring-violet-600/80'
      }`}
      onClick={() => onChange(game.toUpperCase())}
    >
      <input
        type="radio"
        name="radio"
        value={game}
        checked={isSelected}
        className="hidden"
      />
        <div className="relative w-full h-full overflow-hidden">
          <img className="w-full h-full" src={iconPath} alt={game}/>
            <div className="absolute group-hover:flex hidden inset-0 bg-black opacity-70 transition-opacity duration-300"></div>
        </div>
          <p className="absolute inset-0 group-hover:flex hidden text-balance items-center justify-center w-full h-full mx-auto mt-2 px-1 text-sm font-medium transition-opacity text-white">
            {game}
          </p>
    </div>
  );
}
