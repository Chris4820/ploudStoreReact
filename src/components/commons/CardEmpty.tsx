import { TbBoxOff } from "react-icons/tb";


type CardEmptyProps = {
    title: string,
    desc: string,
}


export default function CardEmptyComponent({title, desc} : CardEmptyProps) {
    return(
        <div className="mx-auto my-auto flex flex-col items-center justify-center w-full text-center">
            <TbBoxOff size={56}/>
            <div className="max-w-[70%] mt-1">
                <h1 className="text-base font-semibold">{title}</h1>
                <p className="text-muted-foreground">{desc}</p>
            </div>
        </div>
    )
}