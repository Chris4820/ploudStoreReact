
type HeaderSectionProps = {
    title: string,
    description: string,
}


export default function HeaderSection({title, description} : HeaderSectionProps) {
    return(
        <div className="mb-5">
            <h1 className="font-bold text-2xl">{title}</h1>
            <p className="text-muted-foreground text-base">{description}</p>
        </div>
    )
}