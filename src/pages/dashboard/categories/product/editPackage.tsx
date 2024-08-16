import { useNavigate, useParams } from "react-router-dom";
import HeaderSection from "../../../../components/commons/Header";
import { useGetProduct } from "../../../../api/store/store/product";
import NotFoundComponent from "../../../../containers/404Component";
import { Input } from "../../../../components/ui/input";
import ImageUpload from "../../../../components/imageUploadTest";
import { Switch } from "../../../../components/ui/switch";
import { Button } from "../../../../components/ui/button";
import { useGetAllCategorie } from "../../../../api/store/store/categorie";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { toast } from "sonner";
import { Textarea } from "../../../../components/ui/textarea";
import { createProduct } from "../../../../api/req/store/products";
import { useMutation } from "@tanstack/react-query";
import ConfirmModal from "../../../../components/modal/confirmModal";
import LoadingComponent from "../../../../containers/LoadingComponent";





export default function EditPackagePage() {

    const { productId } = useParams();
    //const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {data: categories} = useGetAllCategorie();

    const {data: product, isLoading} = useGetProduct(Number(productId));


    const { mutate: cloneProduct } = useMutation({
        mutationFn: createProduct, // Passando os parâmetros corretamente
        onSuccess: () => {
            //queryClient.invalidateQueries({ queryKey: ['products', categoryId.toString()] });
            toast('Produto clonado com sucesso!');
            return navigate(-1);
        },
    });

    if(isLoading) {
        return <LoadingComponent/>
    }

    if (!product) {
        return <NotFoundComponent
        title="Produto não encontrado" 
        description="O produto que você está procurando não foi encontrado. Por favor, verifique se o ID do produto está correto ou entre em contato conosco para obter assistência."
        link="/dashboard/categorie" />
    } 


    return(
        <>
        <HeaderSection title="Editar produto"/>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input className="mt-1" defaultValue={product.name}/>
                </div>
                <div>
                    <label>Descrição</label>
                    <Textarea defaultValue={product.description} className="mt-1 h-32 resize-none"/>
                </div>
                <div>
                    <label>Preço</label>
                    <Input className="mt-1" type="number" defaultValue={product.price}/>
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="mt-5">
                    <ImageUpload id="productId" MAX_SIZE_IMAGE={5} onImageChange={() => console.log("Mudou")}/>
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Desativar produto</h1>
                        <p>Ative a visibilidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-product" />
                </div>
                <div className="p-5 border rounded-lg">
                    <div>
                        <h1 className="font-semibold text-lg mb-2">Clonar produto</h1>
                    </div>
                    <div className="flex justify-between w-full">
                        <Select>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {categories?.map((category) => (
                                <ConfirmModal
                                title="Clonar Produto"
                                description={`Tem a certeza que pretende clonar este produto na categoria ${category.id}`}
                                onConfirm={() => cloneProduct({ ...product, name: product.name + " - Copy", categoryId: category.id })}>
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            </ConfirmModal>
                        ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </div>
                    
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold text-lg">Quantidade</h1>
                        <p>Ative a quantidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-quantity" />
                </div>
            </div>
        </div>
        <div className="mt-5 flex justify-end">
            <Button>Guardar</Button>
        </div>
        </>
    )
}