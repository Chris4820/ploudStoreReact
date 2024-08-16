import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

type CreateModalProps = {
  children: React.ReactNode,
  title: string,
  description: string,
  onConfirm: (inputValue: string) => void, // Atualizado para aceitar um valor de input
  important?: string,
  defaultValue?: string,
}

export default function EditModal({ children, title, description, onConfirm, important, defaultValue }: CreateModalProps) {
  const [inputValue, setInputValue] = useState("");

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
          <Input
            type="text"
            value={inputValue}
            defaultValue={defaultValue && defaultValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite o nome do servidor"
            className="mt-2 p-2 border rounded w-full"
          />
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-5 items-center justify-end">
              <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => onConfirm(inputValue)}>Confirmar</Button>
              </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
