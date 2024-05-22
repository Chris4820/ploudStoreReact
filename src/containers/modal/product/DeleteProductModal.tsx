import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { toast } from "sonner";
import { ProductProps } from "../../../api/req/store/categorie";
import { deleteProduct } from "../../../api/req/store/products";

export function DeleteProductModal({ children, product, categoryId }: { children: React.ReactNode, product: ProductProps, categoryId: number }) {
    const queryClient = useQueryClient();

    const { mutate: categorieDelete } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', categoryId.toString()] });
            toast('Produto Eliminada com sucesso!');
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Eliminar Produto</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <p>Pretende eliminar a categoria <b>{product.name}</b>?</p>
                        <p>Todos os produtos desta categoria serão eliminados!</p>
                        <p className="text-destructive">*Esta ação não tem volta</p>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center justify-end">
                                <DialogClose className="flex gap-4">
                                    <Button variant={"outline"}>Fechar</Button>
                                    <Button onClick={() => categorieDelete(product.productId)} variant="destructive">Eliminar</Button>
                                </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
