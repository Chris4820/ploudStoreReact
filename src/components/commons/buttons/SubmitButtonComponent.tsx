import { CgSpinner } from "react-icons/cg"
import { Button } from "../../ui/button"


type SubmitButtonProps = {
  text: string,
  isLoading: boolean,
  enable?: boolean,
}

export default function SubmitButton({text, isLoading, enable}: SubmitButtonProps) {
  console.log(enable);
  return(
    <Button type="submit" disabled={isLoading || !enable}>
      {isLoading ? (
        <span className="flex gap-1 items-center">
          Carregando
          <CgSpinner className="animate-spin"/>
        </span>
      ) : (
        text
      )}
    </Button>
  )
}