import { MdOutlineAddCircle } from "react-icons/md";
import { Button, ButtonProps } from "../../ui/button";



interface CreateButtonProps extends ButtonProps {
    title: string;
  }

export default function CreateButtonComponent({title, ...rest} : CreateButtonProps) {
    return(
        <Button {...rest} className="gap-1 items-center border-2 border-primary bg-primary/85 hover:bg-primary duration-150">
                <MdOutlineAddCircle size={18}/>
                <span className="mb-[1px]">{title}</span>
        </Button>
    )
}