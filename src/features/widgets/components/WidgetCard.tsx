import type { LucideIcon } from "lucide-react";




type WidgetCardComponentProps = {
  title: string,
  description: string,
  onClick: () => void,
  icon?: LucideIcon; // Aceita um ícone do tipo Lucide
}


export default function WidgetCardComponent({title, description, onClick, icon: Icon} : WidgetCardComponentProps) {

  return(
    <div className="lg:w-[400px] w-full border rounded-lg hover:bg-muted/50 shadow-md p-5 cursor-pointer" onClick={() => onClick()}>
        <div className="flex gap-2 items-center">
          {Icon && <Icon className={`text-violet-600`} size={20} />} {/* Ícone com cor definida */}
          <h1 className="text-xl mb-0.5 font-semibold">{title}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
} 