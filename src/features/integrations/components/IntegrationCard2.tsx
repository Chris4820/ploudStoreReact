import type { IconType } from "react-icons/lib";
import { Link } from "react-router-dom"



type IntegrationCardProps = {
  title: string,
  description: string,
  link: string,
  Icon: IconType
  isActive?: boolean
}

export default function IntegrationCard2({Icon, link, title, description, isActive= false} : IntegrationCardProps) {

  return(
    <Link 
      className="relative lg:w-[400px] w-full border rounded-lg hover:bg-muted/50 duration-300 shadow-md p-5 cursor-pointer" 
      to={link}>
        <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1.5">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              isActive ? "bg-green-500 shadow-sm shadow-green-500/20" : "bg-red-400 shadow-sm shadow-red-400/20"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              isActive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
            }`}
          >
            {isActive ? "Ativo" : "Inativo"}
          </span>
        </div>
      </div>
          <div className="flex gap-2 items-center">
            <Icon size={24} className="text-purple-600"/>
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
          <p className="text-muted-foreground mt-1">{description}</p>
    </Link>
  )
}