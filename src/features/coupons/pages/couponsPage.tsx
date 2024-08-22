import { useNavigate } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import { useGetCoupons } from "../../../api/store/store/coupons";
import { DataTable } from "../../../components/ui/datatable";
import { columnsCoupon } from "./CouponColumns";



export default function CouponPage() {
    const navigate = useNavigate();
    const { data: coupons, isLoading} = useGetCoupons();

    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection title="Descontos" description="Crie novos descontos para sua loja!"/>
            <CreateButtonComponent onClick={() => navigate('create')} title="Desconto"/>
        </div>
        <DataTable data={coupons || []} loading={isLoading} columns={columnsCoupon} link="edit/{id}"/>

        </>
    )
}