import { LoaderCircle } from "lucide-react";
import { Button, type ButtonProps } from "../../ui/button";





interface SubmitButtonProps extends ButtonProps {
  text: string,
  isPending: boolean,
  isDisable: boolean,
}

export default function SubmitButton({text, isPending, isDisable, ...rest} : SubmitButtonProps) {
  return(
    <Button
      {...rest}
      type="submit"
      disabled={isPending || isDisable}>
      {isPending ? (
        <span className="flex gap-1 items-center">
          Carregando
          <LoaderCircle className="animate-spin"/>
        </span>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  )
}