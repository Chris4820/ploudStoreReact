import { ArrowLeftIcon } from "lucide-react";
import { Link, unstable_HistoryRouter, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { ProductProps } from "../../../../../api/req/store/categorie";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import BackComponent from "../../../../../components/commons/BackComponent";





export default function ProductIdPage() {
    const [products, setProducts] = useState<ProductProps>();
    const params = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const categoryId = params.categoryId;


    useEffect(() => {
        console.log(state);
        if(!state) {
            return navigate('../categorie')
        }
        const { product } = state;
       
        if(!product || product === null) {
            return navigate('../categorie')
        }
        setProducts(product);
    }, [])
    return(
        <>
            <BackComponent text="Voltar"/>
        <h1 className="text-xl mt-2">Categoria: <span className="font-semibold">{products?.name}</span></h1>
        <section className="container border rounded-lg space-y-1 py-5 mt-5">
            <Input defaultValue={products?.name}/>
            <Input defaultValue={products?.description}/>
            <Input defaultValue={products?.price}/>
            <Input defaultValue={products?.productId}/>
        </section>
        </>
    )
}