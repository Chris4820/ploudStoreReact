

type SubHeaderSectionProps = {
    title: string,
    description: string,
}


export default function SubHeaderSection({title, description} : SubHeaderSectionProps) {
    return(
        <div>
            <h1 className="font-bold text-xl">{title}</h1>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    )
}