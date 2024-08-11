import NextComponent from "./NextComponent"

type CardSectionProps = {
    title: string,
    hAuto?: boolean,
    link?: string,
    children: React.ReactNode,
    className?: string // Propriedade opcional para a classe CSS personalizada
}

export default function CardSection({title, children, hAuto = false, link}: CardSectionProps) {
    return(
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex px-6 py-4 justify-between items-center">
                <h1 className="font-semibold text-lg leading-none tracking-tight">{title}</h1>
                {link && <NextComponent toLink={link} text="Ver mais"/>}
            </div>
            <hr/>
                <div className={`${hAuto ? 'h-auto' : 'h-72 text-center'} w-full rounded-md p-6 shadow-md`}>
                    <div>
                        {children}
                    </div>
                </div>
        </div>
    )
}