type CardSectionProps = {
    title: string,
    children: React.ReactNode,
}

export default function CardSection({title, children}: CardSectionProps) {
    return(
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm lg:col-span-5">
            <div className="flex flex-col space-y-1.5 p-6">
                <h1 className="font-semibold leading-none tracking-tight">{title}</h1>
            </div>
            <div className="p-6 pt-0">
                <div className="h-72 w-full rounded-md border-2 border-dashed text-center p-2">
                    {children}
                </div>

            </div>
        </div>
    )
}