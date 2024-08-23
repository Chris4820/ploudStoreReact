import { Button, type ButtonProps } from "../../ui/button"
import { LoaderCircle } from "lucide-react";


interface SubmitButtonProps extends ButtonProps {
  text: string,
  isLoading: boolean,
  enable?: boolean,
}

export default function SubmitButton({text, isLoading, enable = true, ...rest}: SubmitButtonProps) {
  return(
    <Button {...rest} type="submit" disabled={isLoading || enable}>
      {isLoading ? (
        <span className="flex gap-1 items-center">
          Carregando
          <LoaderCircle className="animate-spin"/>
        </span>
      ) : (
        text
      )}
    </Button>
  )
}