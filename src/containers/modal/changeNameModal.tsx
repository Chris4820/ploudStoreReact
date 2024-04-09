import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeNameUser } from "../../api/req/user";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";

export function ChangeNameModal({ children, name }: { children: React.ReactNode, name: string }) {
    const queryClient = useQueryClient();

    const changeNameSchema = z.object({
        name: z.string().min(3, "O email precisa ter pelo menos 3 caracteres")
        .default(name),
    })
    type loginUserFormData = z.infer<typeof changeNameSchema>
    const { handleSubmit, register, formState: { errors }} = useForm<loginUserFormData>({
        resolver: zodResolver(changeNameSchema),
    })

    async function sendChangeName(data: loginUserFormData) {
            try {
                changeName(data.name);
            } catch (error) {
                console.log(error);
            }
        
    }

    const { mutate: changeName } = useMutation({
        mutationFn: changeNameUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            toast('Convite aceito com sucesso!');
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Mudar nome</DialogTitle>
                    <DialogDescription>
                        Altere seu nome aqui!
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <form onSubmit={handleSubmit(sendChangeName)} noValidate>
                        <div>
                            <Input {...register("name")} defaultValue={name}/>
                            {errors.name && <span className='text-destructive text-[12px]'>{errors.name.message}</span>}
                        </div>
                        <DialogFooter className="mt-5">
                            <div className="flex items-center justify-end">
                                <div className="flex gap-4">
                                    <DialogClose>
                                        <Button type="button" variant="outline">Voltar</Button>
                                    </DialogClose>
                                    <Button type="submit">Alterar</Button>
                                </div>
                            </div>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
