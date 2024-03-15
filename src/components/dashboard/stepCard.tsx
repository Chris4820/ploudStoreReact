



type StepCardProps = {
    title: string,
    desc: string,
    number: string,
}

export default function StepCardComponent({title, desc, number} : StepCardProps) {
    return(
        <div className="flex justify-start gap-5 p-5 items-center border rounded-lg">
            <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 opacity-75 text-lg font-medium text-white">
                    {number}
                </div>
            </div>
            <div>
                <h1 className="font-semibold text-lg">{title}</h1>
                <p>{desc}</p>
            </div>
        </div>
    )
}