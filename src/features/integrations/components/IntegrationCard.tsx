import type { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom"



type IntegrationCardProps = {
  title: string,
  description: string,
  link: string,
  Icon: IconType
}

export default function IntegrationCard({Icon, link, title, description} : IntegrationCardProps) {
  const navigate = useNavigate();

  return(
    <div 
      className="lg:w-[400px] w-full border rounded-lg hover:bg-muted/50 duration-300 shadow-md p-5 cursor-pointer" 
      onClick={() => navigate(link)}>
          <div className="flex gap-2 items-center">
            <Icon size={24} className="text-purple-600"/>
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
          <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  )
}