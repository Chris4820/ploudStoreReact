import CardSection from "./commons/CardSections"
import { GrCompliance } from "react-icons/gr";

  
  export default function NotificationComponentHome() {
    return (
      <CardSection title="Notificações">
        <ul className="grid gap-8 overflow-auto max-h-full">

          <li className="flex items-center gap-4">
            <GrCompliance size={26} className="text-purple-600"/>
            <div className="grid gap-1 text-start">
              <p className="text-base font-medium leading-none">Meta concluída</p>
              <p className="text-sm text-muted-foreground">
                <span className="italic font-semibold">METAABRIL</span> foi concluída!
              </p>
            </div>
          </li>
          
          <li className="flex items-center gap-4">
            <GrCompliance size={26} className="text-purple-600"/>
            <div className="grid gap-1 text-start">
              <p className="text-base font-medium leading-none">Meta concluída</p>
              <p className="text-sm text-muted-foreground">
                <span className="italic font-semibold">METAABRIL</span> foi concluída!
              </p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <GrCompliance size={26} className="text-purple-600"/>
            <div className="grid gap-1 text-start">
              <p className="text-base font-medium leading-none">Meta concluída</p>
              <p className="text-sm text-muted-foreground">
                <span className="italic font-semibold">METAABRIL</span> foi concluída!
              </p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <GrCompliance size={26} className="text-purple-600"/>
            <div className="grid gap-1 text-start">
              <p className="text-base font-medium leading-none">Meta concluída</p>
              <p className="text-sm text-muted-foreground">
                <span className="italic font-semibold">METAABRIL</span> foi concluída!
              </p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <GrCompliance size={26} className="text-purple-600"/>
            <div className="grid gap-1 text-start">
              <p className="text-base font-medium leading-none">Meta concluída</p>
              <p className="text-sm text-muted-foreground">
                <span className="italic font-semibold">METAABRIL</span> foi concluída!
              </p>
            </div>
          </li>
          </ul>
          </CardSection>
    )
  }
  

  