import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";



type DeleteModalProps = {
  children: React.ReactNode,
  title: string,
  description: string,
  onConfirm: () => void,
  important?: string,
}

export default function ConfirmModal({ children, title, description, onConfirm, important }: DeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {important && <span className="text-base font-semibold font-sans">*{important}</span>}
          
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-5 items-center justify-end">
              <DialogClose asChild>
                    <Button variant={"outline"}>Fechar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => onConfirm()}>Confirmar</Button>
              </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}