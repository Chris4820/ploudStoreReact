import { Button, type ButtonProps } from "../../ui/button";




interface DeleteButtonProps extends ButtonProps {
  text: string,
}


export default function DeleteButton({text, ...props} : DeleteButtonProps) {

  return(
    <Button 
      {...props} 
      variant={"destructive"} 
      className="border-2 border-destructive bg-red-800/85 hover:bg-destructive duration-150">

    {text}

    </Button>
  )
}