



export default function FormLayoutAuth({ children, title, description }: { children: React.ReactNode, title: string, description: string }) {
    return(
        <section className="h-full flex flex-col gap-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl">{title}</h1>
                <p className="text-[15px]">{description}</p>
            </div>
            {children}
        </section>
    )
}