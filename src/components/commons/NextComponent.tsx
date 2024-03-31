import { CgArrowRight } from "react-icons/cg"
import { Link } from "react-router-dom"

type NextComponentProps = {
    toLink: string,
    text: string,
}

export default function NextComponent({ text, toLink} : NextComponentProps) {
    console.log(toLink)
    return(
            <Link className="flex gap-1 items-center text-base hover:underline" to={toLink}>
                {text}
                <CgArrowRight className="font-bold mt-0.5" size={22}/>
            </Link>
        
    )
}