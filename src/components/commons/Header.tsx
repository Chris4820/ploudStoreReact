import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"

type HeaderSectionProps = {
    title: string,
    description?: string,
    toLink?: string,
    backLink?: boolean
}


export default function HeaderSection({title, description, toLink, backLink = false} : HeaderSectionProps) {

    function goBack() {
        // Extrai a URL atual
        const currentURL = window.location.pathname;
        // Remove o último segmento da URL
        const newLink = currentURL.replace(/\/[^/]+\/?$/, '');
        console.log(newLink);
        // Retorna a nova URL
        return newLink;
    };

    const navigate = useNavigate();
    return(
        <div className="mb-5">
            <div className="flex gap-3 items-center">
                {toLink && (
                    <button 
                    onClick={() => navigate(toLink)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-muted shadow-sm hover:bg-muted/90 hover:text-accent-foreground h-7 w-7">
                        <IoIosArrowBack size={18}/>
                    </button>
                )}
                {backLink && (
                    <button 
                    onClick={() => navigate(goBack())}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-muted shadow-sm hover:bg-muted/90 hover:text-accent-foreground h-7 w-7">
                        <IoIosArrowBack size={18}/>
                    </button>
                )}
                <h1 className="whitespace-nowrap text-2xl mb-1 font-semibold">{title}</h1>
            </div>
            
            <p className={`text-muted-foreground text-sm ${backLink && 'pl-10'}`}>{description}</p>
        </div>
    )
}