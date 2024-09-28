import { useNavigate, useSearchParams } from "react-router-dom";
import HeaderSection from "../../../components/commons/Header";
import CreateButtonComponent from "../../../components/commons/buttons/CreateButtonComponent";
import { useGetCoupons } from "../api/store/coupons";
import { DataTable } from "../../../components/ui/datatable";
import { columnsCoupon } from "./CouponColumns";



export default function CouponPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const { data: coupons, isLoading} = useGetCoupons(page);

    return(
        <>
        <div className="flex justify-between items-center">
            <HeaderSection title="Descontos" description="Crie novos descontos para sua loja!"/>
            <CreateButtonComponent onClick={() => navigate('coupons/create')} title="Desconto"/>
        </div>
        <DataTable data={coupons?.coupons || []} loading={isLoading} columns={columnsCoupon} meta={coupons?.meta} link="coupons/edit/{id}"/>

        </>
    )
}