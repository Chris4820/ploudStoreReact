import { RxDragHandleHorizontal } from "react-icons/rx";
import { Button } from "../../../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ProductProps, getCategories, getProducts } from "../../../api/req/store/categorie";
import { CgSpinner } from "react-icons/cg";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { IoSettingsOutline } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";


type AAA = {
    categoryId: string,
}

export function ProductSection(categoryId : AAA) {

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: 1000 * 2,
        refetchOnWindowFocus: false,
    })

    const navigate = useNavigate();

    const {data, isLoading} = useQuery({
        queryKey: ['products', categoryId.categoryId],
        queryFn: () => getProducts(categoryId.categoryId),
        staleTime: 1000 * 2,
        refetchOnWindowFocus: false,
    })

    function openProduct(product: ProductProps) {
        return navigate(product.productId.toString(), {state: { product }})
    }

    console.log(data);

    if(isLoading) {
        return(
            <CgSpinner className="animate-spin" size={36}/>
        )
    }
    if(!data || data.length === 0) {
        return <CardEmptyComponent title="Sem Produtos" desc="Parece que ainda não tem nenhuma produto"/>
    }
    
    return(
        <section className="space-y-1">
        {data.map((product) => (
            <div
            className="flex justify-between p-3 w-full bg-muted items-center rounded-md"
            key={product.productId}
          >
            <div className="flex gap-2">
                <RxDragHandleHorizontal className="cursor-pointer" size={26}/>
                <span>{product.name}</span>
                <span>{product.price}</span>
            </div>
            <div className="flex gap-2 items-center">
                <Button onClick={() => openProduct(product)}>Abrir</Button>
                <Button variant={"destructive"}>Eliminar</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                    <IoSettingsOutline className="cursor-pointer" size={26}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Clonar</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuLabel>Clonar para a categoria:</DropdownMenuLabel>
                            {categories?.map((categorie) => (
                                <DropdownMenuItem key={categorie.categorieId}>{categorie.name}</DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        ))}
        </section>
    )
}

