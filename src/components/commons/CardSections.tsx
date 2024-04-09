import NextComponent from "./NextComponent"

type CardSectionProps = {
    title: string,
    hAuto?: boolean,
    link?: string,
    children: React.ReactNode,
}

export default function CardSection({title, children, hAuto = false, link}: CardSectionProps) {
    return(
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex p-6 justify-between">
                <h1 className="font-semibold leading-none tracking-tight">{title}</h1>
                {link && <NextComponent toLink={link} text="Ver mais"/>}
            </div>
            <div className="p-6 pt-0">
                <div className={`${hAuto ? 'h-auto' : 'h-72 text-center'} w-full rounded-md border-2 border-dashed p-2`}>
                    {children}
                </div>
            </div>
        </div>
    )
}