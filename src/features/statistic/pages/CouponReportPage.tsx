import { useState } from "react";
import { columnsCupon } from "./CouponColumns";
import { useSearchParams } from "react-router-dom";
import { useGetTopCouponData } from "../api/store/statistic";
import { DatePickerWithRange } from "../../../components/ui/datepickerWithRange";
import HeaderSection from "../../../components/commons/Header";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/datatable";




export default function CouponReportPage() {

    const [searchParams] = useSearchParams();


    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const [startDate, setStartDate] = useState();
    const [currentStartDate,] = useState();
    const [endDate, setEndDate] = useState();
    const [currentEndDate,] = useState();

    const {data, isLoading} = useGetTopCouponData(page);

    async function handleFilter() {
        setStartDate(currentStartDate)
        setEndDate(currentEndDate);
    }

    function EnableButtonSearch() {
        return startDate === currentStartDate && endDate === currentEndDate;
    }
    return(
        <>
            <HeaderSection title="Melhores Coupons" description="Consulte aqui os melhores c de sua loja!!"/>
            <div className="flex gap-5 items-center flex-wrap">

                <DatePickerWithRange/>

                <Button disabled={EnableButtonSearch()} onClick={() => handleFilter()}>Pesquisar</Button>
            </div>
            <div className="mt-5">
                <DataTable data={data?.coupons || []} loading={isLoading} meta={data?.meta} columns={columnsCupon}/>
            </div>

        </>
    )
}