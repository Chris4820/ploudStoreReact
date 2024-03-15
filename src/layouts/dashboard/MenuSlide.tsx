import { Link } from "react-router-dom";

export type MenuType ={
    title: string;
    link?: string;
    handleMenu?: () => void;
    iconRight?: React.ReactNode;
    icon: React.ElementType | null;
    closeSlide?: () => void;
}

export default function Menu ({title, link, icon, handleMenu, iconRight, closeSlide} : MenuType) {
    const Icon = icon || null;
    const pathname = "ola";

    return(
        <li
          key="menu-item" // Use uma chave única para cada item do menu
          onClick={closeSlide ? () => closeSlide() : undefined}
        >
            {link ? (
                <Link to={link} className="block">
                <div className={`${pathname === link ? 'border-r-4 border-purple-600 bg bg-secondary' : 'hover:bg-secondary'} font-semibold rounded-lg py-3 px-4 cursor-pointer`}>
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-5 h-5" />}
                        <span className="text-base">{title}</span>
                    </div>
                </div>
            </Link>
            ) : (
                <button onClick={handleMenu} className="block w-full" name={title}>
                    <div className="font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl py-3 px-4 cursor-pointer flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            {Icon && <Icon className="w-5 h-5" />}
                            <span className="text-base">{title}</span>
                        </div>
                        {iconRight && <div>{iconRight}</div>}
                    </div>
                </button>  
            )}
        </li>
    )
}