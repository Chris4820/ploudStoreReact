import { useParams } from "react-router-dom";
import HeaderSection from "../../../../components/commons/Header";
import { useGetCategorie, useGetCategory } from "../../../../api/store/store/categorie";
import NotFoundComponent from "../../../../containers/404Component";
import { Button } from "../../../../components/ui/button";
import { Switch } from "../../../../components/ui/switch";
import ImageUpload from "../../../../components/imageUploadTest";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";




export default function CreatePackagePage() {
    const { categoryId } = useParams();

    const {data: category, isLoading} = useGetCategory(Number(categoryId));

    if(isLoading) {
        return <h1>Aguarde</h1>
    }
    if (!category) {
        return <NotFoundComponent
        title="Categoria não encontrada" 
        description="O produto que você está procurando não foi encontrado. Por favor, verifique se o ID do produto está correto ou entre em contato conosco para obter assistência."
        link="/dashboard/categorie" />
    }

    return(
        <>
        <HeaderSection title="Criar produto"/>
        <h1>Você irá criar uma produto na categoria: <span className="font-bold">{category.name}</span></h1>
        <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3 space-y-5">
                <div>
                    <label>Nome</label>
                    <Input className="mt-1"/>
                </div>
                <div>
                    <label>Descrição</label>
                    <Textarea className="mt-1 h-32 resize-none"/>
                </div>
                <div>
                    <label>Preço</label>
                    <Input className="mt-1" type="number"/>
                </div>
            </div>
            <div className="col-span-2 space-y-5">
                <div className="mt-5">
                    <ImageUpload id="productId" MAX_SIZE_IMAGE={5} onImageChange={() => console.log("Mudou")}/>
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold">Desativar produto</h1>
                        <p>Ative a visibilidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-product" />
                </div>
                <div className="p-5 border rounded-lg flex justify-between items-center">
                    <div>
                        <h1 className="font-semibold">Quantidade</h1>
                        <p>Ative a quantidade do produto</p>
                    </div>
                    <Switch defaultChecked={true} id="enable-quantity" />
                </div>
            </div>
        </div>
        <div className="mt-5 flex justify-end">
            <Button>Criar</Button>
        </div>
        </>
    )
}