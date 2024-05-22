import { MdOutlineAddCircle } from "react-icons/md";
import { Button, ButtonProps } from "../../ui/button";



interface CreateButtonProps extends ButtonProps {
    title: string;
  }

export default function CreateButtonComponent({title, ...rest} : CreateButtonProps) {
    return(
        <Button {...rest} className="gap-1 items-center">
                <MdOutlineAddCircle size={18}/>
                <span className="mb-0.5">{title}</span>
        </Button>
    )
}