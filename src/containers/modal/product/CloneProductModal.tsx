import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { toast } from "sonner";
import { ProductProps } from "../../../api/req/store/categorie";
import { createProduct } from "../../../api/req/store/products";
import { useNavigate } from "react-router-dom";

export function CloneProductModal({ children, product, categoryId }: { children: React.ReactNode, product: ProductProps, categoryId: number }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleCloneProduct = () => {
        cloneProduct({ ...product, name: product.name + " - Copy", categoryId });
    };

    const { mutate: cloneProduct } = useMutation({
        mutationFn: createProduct, // Passando os parâmetros corretamente
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', categoryId.toString()] });
            toast('Produto clonado com sucesso!');
            return navigate(`/dashboard/categorie/${categoryId}`);
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Clonar produto</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <p>Pretente clonar o produto <b>{product.name} e inserir na categoria {categoryId}</b>?</p>
                        <p>Todos os produtos desta categoria serão eliminados!</p>
                        <p className="text-destructive">*Esta ação não tem volta</p>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center justify-end">
                                <DialogClose className="flex gap-4">
                                    <Button variant={"outline"}>Fechar</Button>
                                    <Button onClick={() => handleCloneProduct()}>Clonar</Button>
                                </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
