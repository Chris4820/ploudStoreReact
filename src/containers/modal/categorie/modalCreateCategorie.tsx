import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { toast } from "sonner";
import { createCategorie } from "../../../api/req/store/categorie";
import { Input } from "../../../components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function DialogCreateCategorie({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();

    const createCategorieSchema = z.object({
        name: z.string().min(3, "Mínimo de 3 caracteres"),
        description: z.string().min(6, 'Mínimo de 6 caracteres'),
    })
    type loginUserFormData = z.infer<typeof createCategorieSchema>
    const { handleSubmit, register, formState: { errors }, getValues} = useForm<loginUserFormData>({
        resolver: zodResolver(createCategorieSchema),
    })


    const { mutate: categorieCreate } = useMutation({
        mutationFn: createCategorie,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast('Categoria Criada com sucesso!');
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Eliminar categoria</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Input {...register('name')} placeholder="Name"/>
                        {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                        <Input {...register('description')} placeholder="Description"/>
                        {errors.description && <span className='text-destructive text-[12px]'>{errors.description.message}</span>}
                    </div>
                    <DialogFooter>
                        <div className="flex items-center justify-end">
                                <DialogClose className="flex gap-4">
                                    <Button variant={"outline"}>Fechar</Button>
                                    <Button 
                                    onClick={() => handleSubmit(categorieCreate(getValues('name'), "Desc Teste"))}>
                                        Criar</Button>
                                </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
