import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { toast } from "sonner";
import { CategorieProps, deleteCategorie } from "../../../api/req/store/categorie";

export function DialogDeleteCategorie({ children, categorie }: { children: React.ReactNode, categorie: CategorieProps }) {
    const queryClient = useQueryClient();

    const { mutate: categorieDelete } = useMutation({
        mutationFn: deleteCategorie,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast('Categoria Eliminada com sucesso!');
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
                    <div>
                        <p>Pretende eliminar a categoria <b>{categorie.name}</b>?</p>
                        <p>Todos os produtos desta categoria serão eliminados!</p>
                        <p className="text-destructive">*Esta ação não tem volta</p>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center justify-end">
                                <DialogClose className="flex gap-4">
                                    <Button variant={"outline"}>Fechar</Button>
                                    <Button onClick={() => categorieDelete(categorie.categorieId)} variant="destructive">Eliminar</Button>
                                </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
