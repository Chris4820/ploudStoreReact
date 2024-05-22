import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { toast } from "sonner";
import { CategorieProps, deleteCategorie } from "../../../api/req/store/categorie";
import { useNavigate } from "react-router-dom";

export function ModalDeleteCategorie({ children, category, parentId }: { children: React.ReactNode, category: CategorieProps, parentId: number | null }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    console.log("PARENT AQUI NO ELIMINAR: " +parentId)
    const { mutate: categorieDelete } = useMutation({
        mutationFn: deleteCategorie,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', parentId] });
            toast('Categoria Eliminada com sucesso!');
            
            if(parentId) {
                return navigate(`/dashboard/categorie/${parentId}`)
            }
                return navigate('/dashboard/categorie')
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
                        <p>Pretende eliminar a categoria <b>{category.name}</b>?</p>
                        <p>Todos os produtos associados a esta categoria serão eliminados permanentemente!</p>
                        <p className="text-destructive">*Esta ação não tem volta</p>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center justify-end">
                                <DialogClose className="flex gap-4">
                                    <Button variant={"outline"}>Fechar</Button>
                                    <Button onClick={() => categorieDelete(category.categoryId)} variant="destructive">Eliminar</Button>
                                </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
