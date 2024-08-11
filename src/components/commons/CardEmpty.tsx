import { TbBoxOff } from "react-icons/tb";


type CardEmptyProps = {
    title: string,
    description: string,
}


export default function CardEmptyComponent({title, description} : CardEmptyProps) {
    return(
        <div className="flex flex-col items-center justify-center text-center">
            <TbBoxOff className="w-20 h-20"/>
            <div className="max-w-[70%] mt-1">
                <h1 className="text-base font-semibold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}