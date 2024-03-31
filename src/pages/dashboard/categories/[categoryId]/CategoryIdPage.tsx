import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductSection } from "../../../../containers/dashboard/categories/ProductSection";
import { Button } from "../../../../components/ui/button";
import { MdOutlineAddCircle } from "react-icons/md";
import { SubCategorieSection } from "../../../../containers/dashboard/categories/SubCategorieSection";
import BackComponent from "../../../../components/commons/BackComponent";





export default function CategoryIdPage() {
    const [name, setName] = useState('');
    const params = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const categoryId = params.categoryId;


    useEffect(() => {
        if(!state) {
            return navigate('../categorie')
        }
        const { categorie } = state;
        if(!categorie || categorie === null) {
            return navigate('../categorie')
        }
        setName(categorie.name);
    }, [])
    return(
        <>
        <div className="flex justify-between items-center">
            <BackComponent toLink="../categorie" text="Voltar"/>
        </div>
        <div className="flex justify-between">
            <h1 className="text-xl mt-2">Categoria: <span className="font-semibold">{name}</span></h1>
            <Button className="gap-1 items-center">
                <MdOutlineAddCircle className="mt[1px]" size={18}/>
                Produto
            </Button>
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <ProductSection categoryId={categoryId}/>
        </section>

        <div className="flex justify-end w-full">
        <Button className="gap-1 items-center mt-5">
            <MdOutlineAddCircle className="mt[1px]" size={18}/>
            Sub-Categoria
        </Button>
        </div>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <SubCategorieSection/>
        </section>
        </>
    )
}