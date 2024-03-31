import { MdOutlineAddCircle } from "react-icons/md";
import HeaderSection from "../../../../components/commons/Header";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";



export default function DiscountPage() {
    const navigate = useNavigate();

    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection title="Descontos" description="Crie novos descontos para sua loja!"/>
            <Button onClick={() => navigate('create')} className="gap-1 items-center">
                <MdOutlineAddCircle className="mt[1px]" size={18}/>
                Desconto
            </Button>
        </div>
        </>
    )
}