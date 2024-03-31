import { CgArrowLeft } from "react-icons/cg"
import { Link } from "react-router-dom"

type BackComponentProps = {
    toLink?: string,
    text: string,
}

export default function BackComponent({ text, toLink} : BackComponentProps) {
    console.log(toLink)
    return(
        <>
        {toLink ? (
            <Link className="flex gap-1 items-center text-base hover:underline" to={toLink}>
                <CgArrowLeft className="font-bold mt-0.5" size={22}/>
                {text}
            </Link>
        ) : (
            <div onClick={() => window.history.back} className="flex gap-1 items-center text-base hover:underline hover:cursor-pointer">
                <CgArrowLeft className="font-bold mt-0.5" size={22}/>
                {text}
            </div>
        )}
        </>
        
    )
}