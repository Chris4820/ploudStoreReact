import { Link, type LinkProps } from "react-router-dom"
import { ButtonVariants} from "../../ui/button"
import { PlusCircle, Pencil } from "lucide-react"

interface ButtonLinkProps extends LinkProps  {
  text: string,
  type?: 'CREATE' | 'EDIT' | 'NONE'
}

export default function ButtonLink({ text, type, ...rest}: ButtonLinkProps) {
  return(
    <Link 
      {...rest}
      className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${ButtonVariants({ variant: "default" })}`}>
      {type === "CREATE" ? (
        <PlusCircle className="mr-1 h-5 w-5" />
      ) : (type === "EDIT") ? (
        <Pencil className="mr-1 h-5 w-5" />
      ) : null}
      <span>{text}</span>
    </Link>
  )
}