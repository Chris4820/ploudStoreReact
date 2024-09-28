import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button";

type HeaderSectionProps = {
    title: string,
    description?: string,
    backLink?: string
}


export default function HeaderSection({title, description, backLink} : HeaderSectionProps) {

    const navigate = useNavigate();
    return(
        <div className="mb-5">

            <div className="flex gap-5 items-center">
                {backLink && (
                    <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)}><IoIosArrowBack size={25}/></Button>
                )}
            <div>
                <h1 className="whitespace-nowrap text-2xl mb-1 font-semibold">{title}</h1>
                <p className={`text-muted-foreground text-sm`}>{description}</p>
            </div>
            </div>
        </div>
    )
}