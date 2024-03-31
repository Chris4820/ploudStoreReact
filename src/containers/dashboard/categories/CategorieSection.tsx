import { RxDragHandleHorizontal } from "react-icons/rx";
import { Button } from "../../../components/ui/button";
import { CategorieProps } from "../../../api/req/store/categorie";
import { CgSpinner } from "react-icons/cg";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { useNavigate } from "react-router-dom";
import { DialogDeleteCategorie } from "../../modal/categorie/modalDeleteCategorie";
import { useGetCategorie } from "../../../api/store/store/categorie";

  export function CategorieSection() {

    const navigate = useNavigate()
    
    const {data: categories, isLoading} = useGetCategorie();

    function openCategory(categorie: CategorieProps) {
        return navigate(categorie.categorieId.toString(), {state: { categorie }})
    }

    if(isLoading) {
        return(
            <CgSpinner className="animate-spin" size={36}/>
        )
    }
    if(!categories || categories.length === 0) {
        return <CardEmptyComponent title="Sem categorias" desc="Parece que ainda não tem nenhuma categoria"/>
    }
    
    return(
        <section className="space-y-1">
        {categories.map((categorie) => (
            <div
            className="flex justify-between p-3 w-full bg-muted items-center rounded-md"
            key={categorie.categorieId}
          >
            <div className="flex gap-2">
                <RxDragHandleHorizontal className="cursor-pointer" size={26}/>
                <span>{categorie.name}</span>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => openCategory(categorie)}>Abrir</Button>
                <DialogDeleteCategorie categorie={categorie}>
                    <Button variant={"destructive"}>Eliminar</Button>
                </DialogDeleteCategorie>
            </div>
          </div>
        ))}
        </section>
    )
}

